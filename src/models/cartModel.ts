import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { IProduct } from "./productModel";

const status = ["active", "completed"];

export interface ICartItem {
    product: IProduct | ObjectId;
    unitPrice: number;
    quantity: number;
}

export interface ICart extends Document {
    userId: string | ObjectId;
    items: ICartItem[];
    totalAmount: number;
    status: "active" | "completed";
}

const cartItemSchema = new Schema<ICartItem>({
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
})

const cartSchema = new Schema<ICart>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: status, default: "active" }
})

export const cartModel = mongoose.model<ICart>("Cart", cartSchema);