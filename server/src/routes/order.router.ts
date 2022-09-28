import express, { Request, Response, Router } from "express";
import OrderModel from "../Entity/Order";
import { Order } from "../interfaces";
// import { Order } from "../Entity/Order";
import { LOG } from "../logger";
import { OrderService } from "../services/order.service";

const orderRouter: Router = express.Router();
orderRouter.use(express.json());

orderRouter.post("/make", async (req: Request, res: Response) => {
    try {
        // console.log(request.body.order)

        let orderData: Order = req.body.order;
        orderData = await OrderService.create(orderData);
        res.status(200).json({orderData})

        // console.log("Hii")
        // console.log(orderData)
        // const generateOrder = new OrderModel(orderData);
        // console.log(generateOrder)
        // generateOrder.save().then(saveOrder => {
        //     console.log(saveOrder)
        //     res.send(saveOrder)
        // })
    } catch (e: any) {
        LOG.error(e);
        res.status(500).json({ error: e.message });
        console.log(e)
    }
})

export { orderRouter };