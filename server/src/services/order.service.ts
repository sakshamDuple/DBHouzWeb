import { Double, InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { collections } from "../db.service";
import { OrderStatus, IProduct, Order, transactionMethod } from "../interfaces";

class OrderServiceClass {
    async create(newOrder: Order): Promise<Order> {
        newOrder = { ...newOrder }
        newOrder.createdAt = Date.now()
        newOrder.transactionDetail.transactionDate = Date.now()
        if(newOrder.transactionDetail.transactionMethod == "CASH_ON_DELIVERY") {
            newOrder.transactionDetail.transactionMethod = transactionMethod.CASH_ON_DELIVERY
        }
        newOrder = this.sanitize(newOrder)
        if (newOrder.transactionDetail.status == "successful") {
            newOrder.order_status = OrderStatus.Payment_Accepted
        }
        // delete newOrder._id
        console.log(newOrder, "hiii")
        const result: InsertOneResult<Order> = await collections.orders.insertOne(newOrder);
        newOrder._id = result.insertedId
        return newOrder
    }
    async getByUser(Id: string): Promise<Order[]> {
        return (await collections.orders
            .find({ "customerDetail.userId": Id })
            .sort({ createdAt: -1 })
            .toArray()) as Order[]
    }
    async getBySeller(Id: string): Promise<Order[]> {
        return (await collections.orders
            .find({ "products.sellerId": Id })
            .sort({ createdAt: -1 })
            .toArray()) as Order[]
    }
    async get(): Promise<Order[]> {
        return (await collections.orders
            .find().sort({ createdAt: -1 })
            .toArray()) as Order[]
    }
    sanitize(o: Order): Order {
        if (o.products) o.products.forEach(i => {
            i.saleId = new ObjectId(i.saleId)
        })
        if (o.address) o.address.addressId = new ObjectId(o.address.addressId)
        if (o.customerDetail) o.customerDetail.customerId = new ObjectId(o.customerDetail.customerId)
        if (o.transactionDetail.transactionMethod != transactionMethod.CASH_ON_DELIVERY) o.transactionDetail.transactionId = new ObjectId(o.transactionDetail.transactionId)
        if (Number.isNaN(o.total_price)) o.total_price = 0
        if (o.createdAt) o.expectedDeliveryDate = 5*24*60*60*1000 + Date.now();
        return o
    }
}

export let OrderService: OrderServiceClass = new OrderServiceClass()