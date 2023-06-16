import mongoose from "mongoose";

const {Schema} = mongoose;

const orderSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        phoneNumber:{
            type: String,
            required: true,
        },
        university:{
            type: String,
            required: true,
        },
        orderItems:{
            type: String,
            required: true,
        },
        orderDate:{
            type: String,
            required: true,
        }
    },
    {timestamps:false}
);

export default mongoose.models.Order || mongoose.model("Order",orderSchema);