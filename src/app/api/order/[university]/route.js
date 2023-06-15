import {NextResponse} from "next/server";
import connect from "@/utils/db";
import Order from "@/models/order";

export const GET = async (request,{params})=>{
    const { university } = params;

    try{
        await connect();
        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0); // Set to the start of the day
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const orders = await Order.find({
            createdAt: { $gte: today, $lt: tomorrow },
            university:university,
        });
        return await new NextResponse(JSON.stringify(orders), {status:200});
        // return new NextResponse('orders', {status:200});
    }catch (error){
        return new NextResponse("Database Error",{status: 500})
    }
}