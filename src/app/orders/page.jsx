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



const AcceptedOrders = () => {
    const {user,googleSignIn} = UserAuth();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [customer, setCustomer] = useState(false);
    const company_emails = [process.env.NEXT_PUBLIC_MANAGER_1_EMAIL,process.env.NEXT_PUBLIC_ADMIN_EMAIL]
    const router = useRouter()


    useEffect(() => {

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
            let temp = [...orders];
            const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    temp.push(change.doc.data())
                });
                console.log(temp);
                setOrders(temp);
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
                            return <OrderCard key={index} id={index} order={orderJson}/>
                        }
                    )
                }
            </div>

        </>
    );
}

export default AcceptedOrders;