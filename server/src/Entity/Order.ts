import * as mongoose from "mongoose";
import { Double, ObjectId } from "mongodb";
import { IUser, Order } from "../interfaces";

const orderSchema = new mongoose.Schema({
    _id:ObjectId,
    productId: [ObjectId],
    address: Object,
    total_price: {
        default:0,
        type:Number
    },
    customer: ObjectId,
    discount: [String],
    coupon: [String],
    order_status: String,
    createdAt:Number,
    transactionDetail: Object
}, { timestamps: true });

export interface address {
    addressId:ObjectId,
    country: string,
    state: string,
    city: string,
    postal_code: string,
    main_address_text: string
}

export interface transactionDetail {
    transactionId: ObjectId,
    transactionDate: number,
    status: string
}

const OrderModel = mongoose.model<Order & mongoose.Document>('orders', orderSchema);
export default OrderModel;
