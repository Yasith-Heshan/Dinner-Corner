"use client"
import OrderCard from "@/components/OrderCard/OrderCard";
import useSWR from "swr";
import axios from "axios";

const AcceptedOrders = () => {
    const fetcher = async (...args) => {
        const response = await axios.get('api/order')
        return response.data;
    }

    const {data, error, isLoading} = useSWR('/api/order', fetcher);

    return (
        <>
            {
                isLoading && <div>Loading...</div>
            }
            {
                error && <div>Error</div>
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