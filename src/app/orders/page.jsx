"use client"
import OrderCard from "@/components/OrderCard/OrderCard";
import useSWR from "swr";
import axios from "axios";
import styles from './page.module.css'


const AcceptedOrders = () => {
    const fetcher = async (...args) => {
        const response = await axios.get('api/order')
        return response.data;
    }

    const {data, error, isLoading} = useSWR('/api/order', fetcher);

    return (
        <>
            {
                isLoading && <div className={styles.loadingMsg}>Loading...</div>
            }
            {
                error && <div className={styles.errorMsg}>Something went wrong</div>
            }
            {
               data && data.map(
                    (order,index)=>{
                        const orderJson = JSON.parse(JSON.stringify(order));
                        return <OrderCard key={index} id={index} order={orderJson}/>
                    }
                )
            }
        </>
    );
}

export default AcceptedOrders;