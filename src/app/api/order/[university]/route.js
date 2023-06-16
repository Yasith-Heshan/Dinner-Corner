import {NextResponse} from "next/server";
import connect from "@/utils/db";
import Order from "@/models/order";

export const GET = async (request,{params})=>{
    const { university } = params;

    try{
        await connect();

        const orders = await Order.find({
            university:university,
        });
        return await new NextResponse(JSON.stringify(orders), {status:200});
    }catch (error){
        return new NextResponse("Database Error",{status: 500})
    }
}