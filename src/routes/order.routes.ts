import { Router } from "express"
import { createOrder, listOrders, updateOrder } from "../controllers/order.controller"
import { verifyUserRole } from "../middlewares/verify.user.role"

const orderRouter = Router()

orderRouter
    .get('/:orderState/:page/:limit', verifyUserRole('Employee'), listOrders)
    .post('/create', verifyUserRole('Client'), createOrder)
    .put('/update/:orderId', verifyUserRole('Employee'), updateOrder)

export default orderRouter