'use client';
import {UserAuth} from '@/app/context/AuthContext';
import {useEffect, useState} from 'react';
import {
  fetchDeliveryOrder,
  fetchOrders,
  fetchRealTimeData,
  getDeliveryOrderQuery,
  handleDeliveryOrder,
} from '@/utils/firebaseFunctions';
import DeliveryOrderCard from '@/components/DeliveryOrderCard/DeliveryOrderCard';
import {toast} from 'sonner';
import Spinner from '@/components/Spinner/Spinner';
import {company_emails} from '@/utils/constants';
import OrderCard from '@/components/OrderCard/OrderCard';
import {useRouter} from 'next/navigation';
import {HOME} from '@/utils/routes';

const EditRanks = () => {
  const { user } = UserAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deliveryList, setDeliveryList] = useState([]);
  const [fetchedDeliveryList, setFetchedDeliveryList] = useState([]);
  const [updating, setUpdating] = useState(false);

  const finishOrdering = () => {
    if (orders.length === 0) {
      setUpdating(true);
      handleDeliveryOrder(deliveryList)
        .then(() => {
          toast.success('Delivery Order Updated Successfully');
        })
        .catch((e) => {
          console.error(e);
          toast.error('Delivery Order Updating Failed');
        })
        .finally(() => {
          setUpdating(false);
        });
    } else {
      toast.info('Please Add all orders to Delivery order');
    }
  };

  const handleAdd = (order) => {
    const temp = orders.filter((ord) => {
      return ord !== order;
    });
    setOrders([...temp]);
    setDeliveryList([...deliveryList, order]);
  };

  const handleRemove = (order) => {
    const temp = deliveryList.filter((ord) => {
      return ord !== order;
    });
    setDeliveryList([...temp]);
    setOrders([...orders, order]);
  };

  const deliveryOrderFetchHandler = () => {
    fetchDeliveryOrder()
      .then((deliverOrders) => {
        setFetchedDeliveryList(deliverOrders[0].order);
      })
      .catch((e) => {
        console.error(e);
        toast.error('Delivery Order Fetching Failed');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      if (!company_emails.includes(user.email)) {
        router.push(HOME);
      }
      setLoading(true);
      fetchOrders(user)
        .then((orders) => {
          setOrders(orders);
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          setLoading(false);
        });
      setLoading(true);
      fetchRealTimeData(getDeliveryOrderQuery(), deliveryOrderFetchHandler);
    }
  }, [user]);

  console.log(fetchedDeliveryList);

  return (
    <div>
      {user && user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
        <>
          {loading ? (
            <div className={'flex w-full h-[80vh] justify-center items-center'}>
              <Spinner />
            </div>
          ) : (
            <>
              <div className={'sm:grid sm:grid-cols-2'}>
                <div className={'bg-green-500 p-2'}>
                  <p className={'text-xl'}>Current order:</p>
                  {orders.map((order, index) => {
                    return (
                      <div key={index} className={''}>
                        <DeliveryOrderCard delivery={false} handle={handleAdd} order={order} />
                      </div>
                    );
                  })}
                </div>
                <div className={'bg-orange-600 p-2'}>
                  <p className={'text-xl'}>Delivery order:</p>

                  {deliveryList.map((order, index) => {
                    return (
                      <div key={index} className={''}>
                        <DeliveryOrderCard delivery={true} handle={handleRemove} order={order} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={'flex justify-end items-center'}>
                {!updating ? (
                  <button
                    onClick={finishOrdering}
                    className={'bg-green-500 m-5 rounded-lg text-xl p-2'}
                  >
                    Finish Ordering
                  </button>
                ) : (
                  <div className={'m-5'}>
                    <Spinner />
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
      {user && (
        <>
          {fetchedDeliveryList.map((order, index) => {
            return <OrderCard key={index} order={order} user={user} />;
          })}
        </>
      )}
    </div>
  );
};

export default EditRanks;
