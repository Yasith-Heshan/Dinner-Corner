'use client';
import './style.css';
import { useEffect, useState } from 'react';
import { CLOSINGNOTE, DEADLINE, MAXIMUMORDERCOUNT } from '@/utils/constants';
import { format, isAfter, parse } from 'date-fns';
import { UserAuth } from '@/app/context/AuthContext';
import { fetchShopStatus, getOrderCount, saveOrder } from '@/utils/firebaseFunctions';
import { useRouter } from 'next/navigation';
import { ORDERS } from '@/utils/routes';
import Spinner from '@/components/Spinner/Spinner';
import OrderForm from '@/components/OrderForm/OrderForm';

const OrderNow = () => {
  const { user } = UserAuth();
  const [lateOrder, setLateOrder] = useState(false);
  const [limitExceeded, setLimitExceeded] = useState(false);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shopOpen, setShopOpen] = useState(true);

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
                  <OrderForm
                    lateOrder={lateOrder}
                    limitExceeded={limitExceeded}
                    submitting={submitting}
                    submitHandler={placeOrder}
                    user={user}
                  />
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
