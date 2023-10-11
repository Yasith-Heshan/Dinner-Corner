"use client"
import OrderCard from "@/components/OrderCard/OrderCard";
import styles from './page.module.css'
import {useEffect, useState} from "react";
import Categorise from "@/components/Categorise/Categorise";
import {UserAuth} from "@/app/context/AuthContext";
import Spinner from "@/components/Spinner/Spinner";
import {db} from '../firebase'
import {collection, getDocs, doc, setDoc, query, where, onSnapshot, addDoc} from "firebase/firestore";
import {format} from "date-fns";
import { useRouter } from 'next/navigation'
import Locations from "@/components/Locations/Locations";
import {company_emails, STATUS} from "@/utils/constants";



const AcceptedOrders = () => {
    const {user} = UserAuth();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [deliveryOrder, setDeliveryOrder] = useState('');
    const router = useRouter();

    const handleDeliveryOrder =async (e) =>{
        const date = format(new Date(),'yyyy-MM-dd')
        const q = query(collection(db, "orderWithDate"), where("date", "==", date));

        const querySnapshot = await getDocs(q);
        let id = '';
        querySnapshot.forEach((doc) => {
            id = doc.id;
        });
        console.log(deliveryOrder)
        if(id!==''){
            const docRef = await doc(db, "orderWithDate", id);
            await setDoc(docRef,{date,order:deliveryOrder});
            setDeliveryOrder('');
        }else{
            await addDoc(collection(db,'orderWithDate'), {date,order:deliveryOrder});
            setDeliveryOrder('');
        }

    }


    useEffect(() => {

        const fetch=async (q)=>{
            const  temp = [];
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                temp.push(
                    {...doc.data(), id:doc.id}
                );
            });
            temp.sort(
                (a,b)=>a.createdAt-b.createdAt
            )
            setOrders(temp);
        }

        if(user) {
            setIsLoading(true);
            let q = query(collection(db, "orders"),
                where("orderDate", "==", format(new Date(),'yyyy-MM-dd')),
                where("email", "==", user.email),
            );
            if(company_emails.includes(user.email)){
                q = query(collection(db, "orders"),
                    where("orderDate", "==", format(new Date(),'yyyy-MM-dd')),
                );
            }
            const unsubscribe = onSnapshot(q, (snapshot) => {
                let temp = [...orders];
                snapshot.docChanges().forEach((change) => {
                    fetch(q);
                });
                setIsLoading(false);
            });

            return ()=>{
                unsubscribe();
            };

        }else{
            if(typeof window !==undefined){
                if(!localStorage.getItem('user')){
                    router.push('/')
                }
            }
        }
    }, [user]);


    if(!user){
        return <></>
    }


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

            {
               company_emails.includes(user.email) && (
                    <Categorise orders={orders.filter((order)=>{return !(order.status===STATUS.rejected||order.status===STATUS.canceled)})}/>
                )
            }
            <div>
                {
                    orders && orders.filter((order)=>{return !(order.status===STATUS.rejected||order.status===STATUS.canceled)}).map(
                        (order,index)=>{
                            if(company_emails.includes(user.email)){
                                if(!(order.status===STATUS.rejected || order.status===STATUS.canceled)){
                                    const orderJson = JSON.parse(JSON.stringify(order));
                                    return <OrderCard key={index} id={index} order={orderJson} user={user}/>
                                }
                            }else{
                                const orderJson = JSON.parse(JSON.stringify(order));
                                return <OrderCard key={index} id={index} order={orderJson} user={user}/>
                            }

                        }
                    )
                }
            </div>

            {
                company_emails.includes(user.email) && (
                    <Locations orders={orders}/>
                )
            }
            {
                user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                    <div className={styles.inputContainer}>
                        <input className={styles.input} type="text" id="deliveryOrder" value={deliveryOrder}
                               onChange={(e) => setDeliveryOrder(e.target.value)} required/>
                        <button className={`${styles.button} ${styles.update}`} onClick={handleDeliveryOrder}>Update</button>
                    </div>  
                )
            }

        </>
    );
}

export default AcceptedOrders;