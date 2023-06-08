import { Request, Response } from "express"
import InsertOrder from "../core/order/application/insert.order"
import ListOrdersByState from "../core/order/application/list.orders.by.state"
import UpdateOrderByOrderId from "../core/order/application/update.order.by.order.id"

import OrderPrismaRepository from "../core/order/infraestructure/prisma/order.prisma.repository"
import OrderUuidRepository from "../core/order/infraestructure/uuid/order.uuid.repository"
import OrderDishesPrismaRepository from "../core/orderdishes/infraestructure/prisma/orderdishes.prisma.repository"
import OrderDishesUuidRepository from "../core/orderdishes/infraestructure/uuid/orderdishes.uuid.repository"
import DishPrismaRepository from "../core/dish/infraestructure/prisma/dish.prisma.repository"
import RestaurantEmployeePrismaRepository from "../core/restaurantemployee/infraestructure/prisma/restaurant.employee.prisma.repository"

const insertOrder = new InsertOrder(new OrderPrismaRepository, new OrderUuidRepository, new OrderDishesPrismaRepository, new OrderDishesUuidRepository, new DishPrismaRepository)
const listOrdersByState = new ListOrdersByState(new OrderPrismaRepository, new RestaurantEmployeePrismaRepository)
const updateOrderByOrderId = new UpdateOrderByOrderId(new OrderPrismaRepository)

export const createOrder = async (req: Request, res: Response) => {
    const { restaurantId, dishes } = req.body
    const clientId = req.body.userId
    
    try {
        const orderSaved = await insertOrder.create(clientId, restaurantId, dishes)
        
        res.status(201).json({
            status: 'OK',
            message: 'The order was registered',
            data: orderSaved
        })

    } catch (error:any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

export const listOrders = async (req: Request, res: Response) => {
    const { page, orderState, limit } = req.params
    const  chefId = req.body.userId

    try {
        const orderList = await listOrdersByState.listOrders(chefId, orderState, parseInt(page), parseInt(limit))

        res.status(200).json({
            status: 'OK',
            message: 'The list of orders per page',
            data: orderList
        })
    } catch (error: any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    const orderId = req.params.orderId
    const orderState = req.body.orderState
    const chefId = req.body.userId 

    try {
        const orderUpdated = await updateOrderByOrderId.updateOrder(orderId, orderState, chefId)

        res.status(200).json({
            status: 'OK',
            message: 'The order has been assigned and the status has been updated',
            data: orderUpdated
        })

    } catch (error:any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}