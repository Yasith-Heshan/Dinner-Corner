'use client';
import './style.css';
import { pricesList } from '@/utils/priceList';
import { useForm } from 'react-hook-form';
import { useEffect, useReducer, useState } from 'react';
import { getItem } from '@/utils/supportFuncitons';
import { CLOSINGNOTE, DEADLINE, MAXIMUMORDERCOUNT, PLACES } from '@/utils/constants';
import { array, boolean, date, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { format, isAfter, parse, subDays } from 'date-fns';
import { UserAuth } from '@/app/context/AuthContext';
import { LATE_ORDER_ERROR, ORDER_LIMIT_EXCEEDED_ERROR } from '@/utils/errorMessages';
import { fetchShopStatus, getOrderCount, saveOrder } from '@/utils/firebaseFunctions';
import { useRouter } from 'next/navigation';
import { ORDERS } from '@/utils/routes';
import Spinner from '@/components/Spinner/Spinner';

const reducer = (state, action) => {
  switch (action.type) {
    case 'changeItem':
      return {
        item: action.payload,
        size: state.size,
        itemList: state.itemList,
        boarding: state.boarding,
      };
    case 'changeSize':
      return {
        item: state.item,
        size: action.payload,
        itemList: state.itemList,
        boarding: state.boarding,
      };
    case 'addToCart':
      const temp = [];
      for (let i = 0; i < state.size; i++) {
        temp.push(state.item);
      }
      action.callback('itemList', [...state.itemList, ...temp]);
      return {
        item: state.item,
        size: state.size,
        itemList: [...state.itemList, ...temp],
        boarding: state.boarding,
      };
    case 'removeFromCart':
      const index = action.payload;
      const copy = state.itemList;
      delete copy[index];
      action.callback('itemList', copy);
      return {
        item: state.item,
        size: state.size,
        itemList: copy,
        boarding: state.boarding,
      };
    case 'changeLocation':
      return {
        item: state.item,
        size: state.size,
        itemList: state.itemList,
        boarding: action.payload,
      };
  }
};

const OrderNow = () => {
  const { user } = UserAuth();
  const [state, dispatch] = useReducer(reducer, {
    item: null,
    size: 0,
    itemList: [],
    boarding: false,
  });
  const [lateOrder, setLateOrder] = useState(false);
  const [limitExceeded, setLimitExceeded] = useState(false);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shopOpen, setShopOpen] = useState(true);

  const schema = object({
    name: string().required('Invalid Name'),
    date: date().min(subDays(new Date(), 1), 'Invalid Date').required('Invalid Date'),
    phoneNo: string()
      .matches(/^(0|\+94)(11|71|72|70|74|77|76|75|78)-?\d{7}$/, 'Invalid Phone Number')
      .required(),
    location: string().required('Invalid Location'),
    itemList: array().min(1, 'Cart is empty').required('Cart Is empty'),
    specialNotes: string(),
    addGravy: boolean().required(),
  });

  useEffect(() => {
    setLoading(true);
    fetchShopStatus()
      .then((status) => {
        setShopOpen(status.shopOpen);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAddToCart = async () => {
    await dispatch({
      type: 'addToCart',
      callback: setValue,
    });
    await trigger('itemList');
  };
  const handleChangeItem = (e) => {
    dispatch({
      type: 'changeItem',
      payload: getItem(parseInt(e.target.value)),
    });
  };

  const handleChangeSize = (e) => {
    dispatch({
      type: 'changeSize',
      payload: parseInt(e.target.value),
    });
  };
  const handleRemoveFromCart = (index) => {
    dispatch({
      type: 'removeFromCart',
      payload: index,
      callback: setValue,
    });
  };

  const handleChangeLocation = (location) => {
    if (location === PLACES['boardingPlace']) {
      dispatch({
        type: 'changeLocation',
        payload: true,
      });
    } else {
      dispatch({
        type: 'changeLocation',
        payload: false,
      });
    }
  };

  const placeOrder = async (data) => {
    if (confirm('Are you sure?')) {
      setSubmitting(true);
      const maximumOrderTime = parse(
        `${format(new Date(), 'dd-MM-yyyy')} ${DEADLINE}`,
        'dd-MM-yyyy HH:mm',
        new Date(),
      );
      const ordersCount = await getOrderCount(data.date);
      if (ordersCount >= MAXIMUMORDERCOUNT) {
        setLimitExceeded(true);
        setSubmitting(false);
      } else if (
        isAfter(new Date(), maximumOrderTime) &&
        user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL
      ) {
        setLateOrder(true);
        setSubmitting(false);
      } else {
        try {
          const orderDetails = {
            name: data.name,
            email: user.email,
            date: data.date,
            phoneNo: data.phoneNo,
            itemList: data.itemList,
            specialNotes: data.specialNotes,
            location: data.location,
            addGravy: data.addGravy,
          };
          await saveOrder(orderDetails);
          router.push(ORDERS);
        } catch (e) {
          console.error(e);
        } finally {
          setSubmitting(false);
        }
      }
    }
  };

  useEffect(() => {
    if (user) {
      const name = user.displayName;
      setValue('name', name);
    }
  }, [setValue, user]);

  return (
    <>
      {loading ? (
        <div className={'flex justify-center items-center h-[80vh] w-full'}>
          <Spinner />
        </div>
      ) : (
        <>
          {shopOpen ? (
            <>
              {user ? (
                <div
                  className={"w-full bg-[url('/ord.jpg')] flex justify-center items-center py-20"}
                >
                  <form
                    onSubmit={handleSubmit(async (data) => {
                      await placeOrder(data);
                    })}
                    className='mx-auto shadow-green-400 shadow-2xl bg-gray-700 rounded-lg p-10 w-[100vw] sm:w-[65vw]'
                  >
                    {limitExceeded && (
                      <div
                        className={
                          'w-full h-10 rounded-lg mb-5 text-red-500 font-bold text-center bg-red-50 p-1 flex justify-center items-center'
                        }
                      >
                        {ORDER_LIMIT_EXCEEDED_ERROR(new Date(getValues('date')).toLocaleDateString())}
                      </div>
                    )}

                    {lateOrder && (
                      <div
                        className={
                          'w-full h-10 rounded-lg mb-5 text-red-500 font-bold text-center bg-red-50 p-1 flex justify-center items-center'
                        }
                      >
                        {LATE_ORDER_ERROR}
                      </div>
                    )}

                    <div className='mb-5'>
                      <label
                        htmlFor='text'
                        className={errors['name'] ? 'failedLabel' : 'successLabel'}
                      >
                        Your Name
                      </label>
                      <input
                        defaultValue={user ? user.displayName : ''}
                        {...register('name')}
                        className={errors['name'] ? 'failedInput' : 'successInput'}
                        type={'text'}
                      />
                      {errors['name'] && (
                        <p className='failedNote'>
                          <span className='font-medium'>Oops!</span> Invalid Name!
                        </p>
                      )}
                    </div>
                    <div className='mb-5'>
                      <label
                        htmlFor='date'
                        className={errors['date'] ? 'failedLabel' : 'successLabel'}
                      >
                        Date
                      </label>
                      <input
                        min={format(new Date(), 'yyyy-MM-dd')}
                        defaultValue={format(new Date(), 'yyyy-MM-dd')}
                        {...register('date')}
                        className={errors['date'] ? 'failedInput' : 'successInput'}
                        type={'date'}
                      />
                      {errors['date'] && (
                        <p className='failedNote'>
                          <span className='font-medium'>Oops!</span> Invalid Date!
                        </p>
                      )}
                    </div>
                    <div className='mb-5'>
                      <label
                        htmlFor='phoneNo'
                        className={errors['phoneNo'] ? 'failedLabel' : 'successLabel'}
                      >
                        Phone Number
                      </label>
                      <input
                        onChange={async (e) => {
                          setValue('phoneNo', e.currentTarget.value);
                          await trigger('phoneNo');
                        }}
                        className={errors['phoneNo'] ? 'failedInput' : 'successInput'}
                        type={'tel'}
                      />
                      {errors['phoneNo'] && (
                        <p className='failedNote'>
                          <span className='font-medium'>Oops!</span> Invalid Phone Number!
                        </p>
                      )}
                    </div>

                    <div className='mb-5'>
                      <label
                        htmlFor='location'
                        className={errors['location'] ? 'failedLabel' : 'successLabel'}
                      >
                        Pickup Location
                      </label>
                      <select
                        onChange={async (e) => {
                          handleChangeLocation(e.target.value);
                          setValue('location', e.target.value);
                          await trigger('location');
                        }}
                        className={errors['location'] ? 'failedInput' : 'successInput'}
                      >
                        <option></option>
                        {Object.keys(PLACES).map((id, index) => {
                          return (
                            <option value={PLACES[id]} key={index}>
                              {PLACES[id]}
                            </option>
                          );
                        })}
                      </select>

                      {errors['location'] && (
                        <p className='failedNote'>
                          <span className='font-medium'>Oops!</span> Please Select the pickup
                          location!
                        </p>
                      )}

                      {state.boarding && (
                        <p
                          className={
                            'p-1 rounded-lg bg-green-300 text-center text-black font-bold mt-5'
                          }
                        >
                          Please Send location of your boarding place to 0714748483 through whatsapp
                        </p>
                      )}
                    </div>

                    <div className='mb-5'>
                      <label
                        htmlFor='date'
                        className={errors['itemList'] ? 'failedLabel' : 'successLabel'}
                      >
                        Food Items and Quantity
                      </label>
                      <div className={'hidden sm:grid sm:grid-cols-3 gap-1'}>
                        <select
                          onChange={handleChangeItem}
                          className={errors['itemList'] ? 'failedInput' : 'successInput'}
                        >
                          <option></option>
                          {pricesList.map((item) => {
                            return (
                              <option value={item.id} key={item.id}>
                                {item.type} - {item.size} - Rs.{item.price}
                              </option>
                            );
                          })}
                        </select>
                        <select
                          onChange={handleChangeSize}
                          className={errors['itemList'] ? 'failedInput' : 'successInput'}
                        >
                          {[...Array(20).keys()]
                            .map((i) => i)
                            .map((i) => {
                              return (
                                <option value={i} key={i}>
                                  {i}
                                </option>
                              );
                            })}
                        </select>
                        <button
                          onClick={handleAddToCart}
                          type={'button'}
                          className={'bg-green-500 rounded-lg p-1'}
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className={'sm:hidden grid grid-cols-2 gap-1'}>
                        <select
                          onChange={handleChangeItem}
                          className={errors['itemList'] ? 'failedInput' : 'successInput'}
                        >
                          <option></option>
                          {pricesList.map((item) => {
                            return (
                              <option key={item.id}>
                                {item.type} - {item.size} - Rs.{item.price}
                              </option>
                            );
                          })}
                        </select>
                        <button
                          onClick={handleAddToCart}
                          type={'button'}
                          className={'bg-green-500 rounded-lg p-1 row-span-2'}
                        >
                          Add To Cart
                        </button>
                        <select
                          onClick={handleChangeSize}
                          className={errors['itemList'] ? 'failedInput' : 'successInput'}
                        >
                          {[...Array(21).keys()]
                            .map((i) => i)
                            .map((i) => {
                              return <option key={i}>{i}</option>;
                            })}
                        </select>
                      </div>

                      {errors['itemList'] && (
                        <p className='failedNote'>
                          <span className='font-medium'>Oops!</span>Cart is empty!
                        </p>
                      )}

                      <div className={'bg-green-500 rounded-lg w-[100%] min-h-20 my-5 p-1'}>
                        <p className={'p-1'}>Cart:</p>
                        {state.itemList.map((item, index) => {
                          return (
                            <div
                              className={
                                'bg-amber-200 text-black rounded-lg p-2 mb-1 flex justify-between items-center'
                              }
                              key={index}
                            >
                              <p>
                                {item.type} - {item.size} - Rs.{item.price}
                              </p>
                              <button
                                type={'button'}
                                onClick={() => {
                                  handleRemoveFromCart(index);
                                }}
                                className={'bg-red-500 rounded-lg p-1 font-bold'}
                              >
                                Remove From Cart
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className='mb-5'>
                      <label htmlFor='date' className='successLabel'>
                        Special Notes
                      </label>
                      <input
                        {...register('specialNotes')}
                        className={'successInput'}
                        type={'tel'}
                      />
                    </div>

                    <div className='flex items-start'>
                      <label className='relative inline-flex items-center mb-5 cursor-pointer'>
                        <input
                          {...register('addGravy')}
                          type='checkbox'
                          value=''
                          className='sr-only peer'
                          defaultChecked={true}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className='ms-3 text-sm font-medium text-green-500'>Add Gravy</span>
                      </label>
                    </div>
                    {!submitting ? (
                      <div className={'flex justify-center items-center'} role='status'>
                        <button
                          type='submit'
                          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-4xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                        >
                          Place Order
                        </button>
                      </div>
                    ) : (
                      <Spinner />
                    )}
                  </form>
                </div>
              ) : (
                <div className={'flex justify-center items-center  h-[80vh]'}>
                  <p className={'bg-pink-400 rounded-lg p-2 border-red-600'}>
                    Please Sign IN for placing order
                  </p>
                </div>
              )}
            </>
          ) : (
            <div
              className={
                'mx-auto shadow-green-400 shadow-2xl bg-gray-700 rounded-lg p-10 w-[100vw] sm:w-[65vw]'
              }
            >
              <p className={'text-xl text-center font-bold'}>{CLOSINGNOTE}</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default OrderNow;
