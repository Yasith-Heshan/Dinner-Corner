import OrderCard from "@/components/OrderCard/OrderCard";
import axios from "axios";
import connect from "@/utils/db";
import Order from "@/models/order";

const getData = async ()=>{
    await connect();
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const orders = await Order.find({
        createdAt: { $gte: today, $lt: tomorrow }
    });
    console.log(orders);
    return orders;
}

const AcceptedOrders = async () => {
    const orders = await getData();

    return (
        <>
            {
                orders.map(
                    (order,index)=>{
                        return <OrderCard key={index} order={order}/>
                    }
                )
            }
        </>
    );
}

export default AcceptedOrders;