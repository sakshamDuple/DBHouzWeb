import express, { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { Order } from "../interfaces";
// import { Order } from "../Entity/Order";
import { LOG } from "../logger";
import { OrderService } from "../services/order.service";

const orderRouter: Router = express.Router();
orderRouter.use(express.json());

orderRouter.post("/make", async (req: Request, res: Response) => {
    try {
        let orderData: Order = req.body.order;
        orderData = await OrderService.create(orderData);
        res.status(200).json({orderData})
    } catch (e: any) {
        LOG.error(e);
        res.status(500).json({ error: e.message });
        console.log(e)
    }
})

orderRouter.get("/getOrderForUser/:userId", async (req:Request, res:Response) => {
    let UserId: string = req?.params?.userId;
    try {
        res.status(200).json({ order: await OrderService.getByUser(UserId) });
    } catch (e:any) {
        LOG.error(e);
        res.status(500).json({ error: e.message });
        console.log(e)
    }
})

orderRouter.get("/getOrderForSeller/:sellerId", async (req:Request, res:Response) => {
    let SellerId: string = req?.params?.sellerId;
    try {
        res.status(200).json({ order: await OrderService.getBySeller(SellerId) });
    } catch (e:any) {
        LOG.error(e);
        res.status(500).json({ error: e.message });
        console.log(e)
    }
})

orderRouter.get("/getAllOrder", async (req:Request, res:Response) => {
    try {
        res.status(200).json({ order: await OrderService.get() });
    } catch (e:any) {
        LOG.error(e);
        res.status(500).json({ error: e.message });
        console.log(e)
    }
})

export { orderRouter };