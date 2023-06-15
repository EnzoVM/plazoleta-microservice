import { Router } from "express"
import { createOrder, listOrders, assingOrderEmployee, notifyOrder, cancelOrderByClient, deliverOrderToClient } from "../controllers/order.controller"
import { verifyUserRole } from "../middlewares/verify.user.role"

const orderRouter = Router()

orderRouter
    .get('/:orderState/:page/:limit', verifyUserRole('Employee'), listOrders)
    .post('/create', verifyUserRole('Client'), createOrder)
    .put('/assing/order/:orderId', verifyUserRole('Employee'), assingOrderEmployee)
    .put('/notify/order/:orderId', verifyUserRole('Employee'), notifyOrder)
    .put('/cancel/order/:orderId', verifyUserRole('Client'), cancelOrderByClient)
    .put('/deliver/order/:orderId', verifyUserRole('Employee'), deliverOrderToClient)

export default orderRouter