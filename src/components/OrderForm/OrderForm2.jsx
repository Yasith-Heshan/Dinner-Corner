import {useForm} from "react-hook-form";
import {array, boolean, date, object, string} from "yup";
import {format, subDays} from "date-fns";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect, useState} from "react";
import PickUpLocation from "@/components/OrderForm/PickUpLocation";
import Spinner from "@/components/Spinner/Spinner";
import MobileItemSelector from "@/components/OrderForm/MobileItemSelector";
import Cart from "@/components/OrderForm/Cart";
import {calculateTotal} from "@/utils/supportFuncitons";
import {usePathname} from "next/navigation";
import {ORDERNOW} from "@/utils/routes";
import ItemSelector from "@/components/OrderForm/ItemSelector";


const OrderForm2 = ({submitHandler, user = null, order = null}) => {

    const [submitting, setSubmitting] = useState(false);
    const [itemList, setItemList] = useState([]);

    const pathname = usePathname();


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

    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    });


    useEffect(() => {
        if (order) {
            setValue('name', order.name);
            setValue('date', format(new Date(), 'yyyy-MM-dd'));
            setValue('phoneNo', order.phoneNumber);
            setValue('location', order.location);
            setValue('itemList', order.itemList);
            setValue('addGravy', order.addGravy);
            setValue('mapURL', order.mapUrl);
            setItemList(order.itemList);

        } else if (user) {
            setValue('name', user.displayName);
            setValue('itemList', []);
        }
    }, [order, user]);


    return (
        <div>
            <form
                className='mx-auto shadow-green-400 shadow-2xl bg-gray-700 rounded-lg p-10 w-[100vw] sm:w-[65vw]'
                onSubmit={handleSubmit(
                    async (data) => {
                        setSubmitting(true);
                        await submitHandler(data);
                        setSubmitting(false);
                    }
                )}>


                <div className='mb-5'>
                    <label htmlFor='text' className={errors['name'] ? 'failedLabel' : 'successLabel'}>
                        Your Name
                    </label>
                    <input
                        defaultValue={order ? order.name : user ? user.displayName : ''}
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
                    <label htmlFor='date' className={errors['date'] ? 'failedLabel' : 'successLabel'}>
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
                    <label htmlFor='phoneNo' className={errors['phoneNo'] ? 'failedLabel' : 'successLabel'}>
                        Phone Number
                    </label>
                    <input
                        defaultValue={order ? order.phoneNumber : ''}
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

                <PickUpLocation error={errors['location']} defaultValue={order ? order.location : ''}
                                setLocation={async (location) => {
                                    setValue('location', location);
                                    await trigger('location');
                                }}/>
                <div className={'mb-5'}>
                    <label htmlFor='date' className={errors['location'] ? 'failedLabel' : 'successLabel'}>
                        Food Items and Quantity
                    </label>
                    <ItemSelector cart={itemList} setCart={
                        async (items) => {
                            setValue('itemList', items);
                            setItemList(items);
                            await trigger('itemList');
                        }}
                                  error={errors['itemList']}
                    />

                    <MobileItemSelector cart={itemList} setCart={
                        async (items) => {
                            setValue('itemList', items);
                            setItemList(items);
                            await trigger('itemList');
                        }
                    } error={errors['itemList']}/>
                </div>
                <Cart itemList={itemList} handleRemoveFromCart={(items) => {
                    setValue('itemList', items);
                    setItemList(items);
                }}/>

                <div className={'text-xl font-bold flex justify-end items-start mt-3'}>
                    Total = Rs.{calculateTotal(itemList)}
                </div>

                <div className='mb-5'>
                    <label htmlFor='date' className='successLabel'>
                        Special Notes
                    </label>
                    <input defaultValue={order ? order.specialNotes : ''} {...register('specialNotes')}
                           className={'successInput'} type={'text'}/>
                </div>
                {
                    pathname !== ORDERNOW && (
                        <div className='mb-5'>
                            <label htmlFor='date' className='successLabel'>
                                Map URL
                            </label>
                            <input defaultValue={order ? order.mapUrl : ''} {...register('mapUrl')}
                                   className={'successInput'} type={'text'}/>
                        </div>
                    )
                }

                <div className='flex items-start'>
                    <label className='relative inline-flex items-center mb-5 cursor-pointer'>
                        <input
                            {...register('addGravy')}
                            type='checkbox'
                            value=''
                            className='sr-only peer'
                            defaultChecked={true}
                        />
                        <div
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className='ms-3 text-sm font-medium text-green-500'>Add Gravy</span>
                    </label>
                </div>


                {!submitting ? (<div className={'flex justify-center items-center'} role='status'>
                    <button
                        type='submit'
                        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-4xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >
                        {pathname===ORDERNOW?'Place Order':'Edit Order'}
                    </button>
                </div>) : (<Spinner/>)}
            </form>
        </div>
    );
}

export default OrderForm2;

