import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IOrderItem {
    productTitle: string;
    productImage: string;
    quantity: number;
    unitPrice: number;
}

const orderItemSchema = new Schema<IOrderItem>({
    productTitle: { type: String, required: true },
    productImage: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true }
})

export interface IOrder extends Document {
    userId: ObjectId | string;
    orderItems: IOrderItem[];
    total: number;
    address: string;
}

const orderSchema = new Schema<IOrder>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [orderItemSchema],
    total: { type: Number, required: true },
    address: { type: String, required: true }
})

export const orderModel = mongoose.model<IOrder>("Order", orderSchema);