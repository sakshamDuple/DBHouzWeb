import { Double, InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { collections } from "../db.service";
import { OrderStatus, IProduct, Order } from "../interfaces";

class OrderServiceClass {
    async create(newOrder: Order): Promise<Order> {
        newOrder = { ...newOrder }
        newOrder.createdAt = Date.now()
        newOrder.transactionDetail.transactionDate = Date.now()
        newOrder = this.sanitize(newOrder)
        if (newOrder.transactionDetail.status == "successful") {
            newOrder.order_status = OrderStatus.Payment_Accepted
        }
        // delete newOrder._id
        console.log(newOrder,"hiii")
        const result: InsertOneResult<Order> = await collections.orders.insertOne(newOrder);
        newOrder._id = result.insertedId
        return newOrder
    }
    sanitize(o: Order): Order {
        // if (o.productId) o.productId.forEach(i => {
        //     i = new ObjectId(i)
        // })
        if (o.address) o.address.addressId = new ObjectId(o.address.addressId)
        if (o.transactionDetail) o.transactionDetail.transactionId = new ObjectId(o.transactionDetail.transactionId)
        if (Number.isNaN(o.total_price)) o.total_price = 0
        return o
    }
}

export let OrderService: OrderServiceClass = new OrderServiceClass()