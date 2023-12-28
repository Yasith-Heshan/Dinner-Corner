'use client';
import OrderCard from '@/components/OrderCard/OrderCard';
import {useEffect, useState} from 'react';
import Categorise from '@/components/Categorise/Categorise';
import {UserAuth} from '@/app/context/AuthContext';
import Spinner from '@/components/Spinner/Spinner';
import {onSnapshot} from 'firebase/firestore';
import {useRouter} from 'next/navigation';
import Locations from '@/components/Locations/Locations';
import {company_emails, STATUS} from '@/utils/constants';
import {fetchOrders, getQuery} from '@/utils/firebaseFunctions';
import {toast} from "sonner";
import {ORDER_FETCHING_ERROR} from "@/utils/errorMessages";

const AcceptedOrders = () => {
    const {user} = UserAuth();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);

        if (user) {
            const q = getQuery(user);
            const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach(() => {
                    fetchOrders(user).then((orders) => {
                        setOrders(orders);
                    }).catch(
                        (e) => {
                            console.error(e);
                            toast.error(ORDER_FETCHING_ERROR);
                        }
                    );
                });
                setIsLoading(false);
            });

            return () => {
                unsubscribe();
            };
        } else {
            if (typeof window !== undefined) {
                if (!localStorage.getItem('user')) {
                    router.push('/');
                }
            }
        }
    }, [user]);

    if (!user) {
        return (
            <div className={'flex justify-center items-center  h-[80vh]'}>
                <p className={'bg-pink-400 rounded-lg p-2 border-red-600'}>
                    Please Sign IN for placing order
                </p>
            </div>
        );
    }

    return (
        <>
            {isLoading ? (
                <div className={'w-full h-[80svh] flex justify-center items-center'}>
                    <Spinner/>
                </div>
            ) : (
                <>
                    {
                        orders.length !== 0 ? (
                            <div>
                                {user && company_emails.includes(user.email) && (
                                    <Categorise orders={orders}/>
                                )}
                                <div>
                                    {orders &&
                                        orders
                                            .filter((order) => {
                                                return !(order.status === STATUS.rejected || order.status === STATUS.canceled);
                                            })
                                            .map((order, index) => {
                                                if (company_emails.includes(user.email)) {
                                                    if (!(order.status === STATUS.rejected || order.status === STATUS.canceled)) {
                                                        const orderJson = JSON.parse(JSON.stringify(order));
                                                        return <OrderCard key={index} order={orderJson} user={user}/>;
                                                    }
                                                } else {
                                                    const orderJson = JSON.parse(JSON.stringify(order));
                                                    return <OrderCard key={index} order={orderJson} user={user}/>;
                                                }
                                            })}
                                </div>
                                {user && company_emails.includes(user.email) && (
                                    <Locations orders={orders}/>
                                )}
                            </div>
                        ) : (
                            <div className={'text-xl text-center'}>
                                {
                                    !company_emails.includes(user.email) ?
                                        (
                                            <>
                                                You haven&apos;t ordered any food item
                                            </>
                                        ) :(
                                            <>
                                                Empty orders list
                                            </>
                                        )
                                }
                            </div>
                        )
                    }
                </>
            )}
        </>
    );
};

export default AcceptedOrders;
