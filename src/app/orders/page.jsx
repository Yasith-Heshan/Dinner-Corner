import OrderCard from "@/components/OrderCard/OrderCard";
import axios from "axios";
import connect from "@/utils/db";
import Order from "@/models/order";

const getData = async ()=>{
    await connect();
    const today = new Date();
    // today.setUTCHours(0, 0, 0, 0);
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    console.log(today, tomorrow);
    const orders = await Order.find();
    return orders;
}

const AcceptedOrders = async () => {
    const orders = await getData();

    return (
        <>
            {
                orders.map(
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