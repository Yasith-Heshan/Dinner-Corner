"use client"
import OrderCard from "@/components/OrderCard/OrderCard";
import styles from './page.module.css'
import {useEffect, useState} from "react";
import Categorise from "@/components/Categorise/Categorise";
import {UserAuth} from "@/app/context/AuthContext";
import Spinner from "@/components/Spinner/Spinner";
import {db} from '../firebase'
import {collection, getDocs, query, where,onSnapshot,orderBy} from "firebase/firestore";
import {format} from "date-fns";
import { useRouter } from 'next/navigation'
import Locations from "@/components/Locations/Locations";



const AcceptedOrders = () => {
    const {user,googleSignIn} = UserAuth();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [customer, setCustomer] = useState(false);
    const company_emails = [process.env.NEXT_PUBLIC_MANAGER_1_EMAIL,process.env.NEXT_PUBLIC_ADMIN_EMAIL]
    const router = useRouter()


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
            router.push('/')
        }
    }, [user]);


    if(!user){
        return <></>
    }


    return (
        <>

            <div>
                {
                    isLoading && <div className={styles.loadingMsg}><Spinner/></div>
                }
                {
                    error && <div className={styles.errorMsg}>{error}</div>
                }

            </div>

            {
               company_emails.includes(user.email) && (
                    <Categorise orders={orders}/>
                )
            }
            <div>
                {
                    orders && orders.map(
                        (order,index)=>{
                            const orderJson = JSON.parse(JSON.stringify(order));
                            return <OrderCard key={index} id={index} order={orderJson} user={user}/>
                        }
                    )
                }
            </div>

            {
                user.email===process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                    <Locations orders={orders}/>
                )
            }

        </>
    );
}

export default AcceptedOrders;