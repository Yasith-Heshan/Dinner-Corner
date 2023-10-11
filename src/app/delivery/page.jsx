"use client"
import styles from './page.module.css'
import {useEffect, useState} from "react";
import {UserAuth} from "@/app/context/AuthContext";
import Spinner from "@/components/Spinner/Spinner";
import {db} from '../firebase'
import {collection, getDocs, onSnapshot, or,and, query, where} from "firebase/firestore";
import {format} from "date-fns";
import {usePathname, useRouter} from 'next/navigation'
import {company_emails, STATUS} from "@/utils/constants";
import OrderCard from "@/components/OrderCard/OrderCard";


const EditRanks = () => {
    const {user} = UserAuth();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [customer, setCustomer] = useState(false);
    const router = useRouter()
    const pathname = usePathname();
    const [index, setIndex] = useState(0);


    const handleNext = ()=>{
        if(index<orders.length-1){
            setIndex(index+1);
        }
    }

    const handlePrevious = () =>{
        if(index>=1){
            setIndex(index-1);
        }
    }


    useEffect(() => {
        const date = format(new Date, 'yyyy-MM-dd')

        const fetch = async (q, dateOrderQuery) => {
            const temp = [];

            const orderSnapshot = await getDocs(dateOrderQuery);
            let deliveryOrder = [];
            orderSnapshot.forEach(
                (doc) => {
                    deliveryOrder = doc.data().order.split(',').map(i => (parseInt(i)))
                }
            )
            console.log(deliveryOrder);
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                temp.push(
                    {...doc.data(), id: doc.id}
                );
            });
            let tempOrders = [];
            deliveryOrder.forEach(
                (id) => {
                    temp.forEach(
                        (order) => {
                            if (order.rank === id) {
                                tempOrders.push(order);
                            }
                        }
                    )
                }
            )
            setOrders(tempOrders);
        }

        if (user && user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {

            setIsLoading(true);


            const q = query(collection(db, "orders"),
                and(where("orderDate", "==", date),
                or(where("status", "==", STATUS.accepted), where('status', "==", STATUS.pending)))
            );
            const dateOrderQuery = query(collection(db, "orderWithDate"), where("date", "==", date),);


            const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    fetch(q, dateOrderQuery);
                });
                setIsLoading(false);
            });
            const unsubscribe2 = onSnapshot(dateOrderQuery,
                (snapshot) => {
                    snapshot.docChanges().forEach((change) => {
                        fetch(q, dateOrderQuery);
                    });
                    setIsLoading(false);
                }
            )

            return () => {
                unsubscribe();
            };

        } else {
            if (typeof window !== undefined) {
                if (!localStorage.getItem('user')) {
                    router.push('/')
                }
            }
        }
    }, [user]);


    if (!user) {
        return <></>
    }

    console.log(orders)


    return (
        <>

            <div>
                {
                    isLoading && <div className={styles.heading}><Spinner/></div>
                }
                {
                    error && <div className={styles.errorMsg}>{error}</div>
                }
            </div>

            {
                !company_emails.includes(user.email) &&
                (<h2 className={styles.loadingMsg}>{format(new Date(), 'yyyy-MM-dd')} සදහා ඇනවුම්:</h2>)
            }

            <div>
                {
                    orders[index] && (
                        <><OrderCard order={orders[index]} id={index} user={user}/></>
                    )
                }
                <div className={styles.actionButtons}>
                    <button className={`${styles.button} ${styles.accept}`} onClick={handlePrevious}>
                        Previous
                    </button>
                    <button className={`${styles.button} ${styles.reject}`} onClick={handleNext}>
                        Next
                    </button>
                </div>
            </div>


        </>
    );
}

export default EditRanks;