import { Request, Response } from "express"
import InsertOrder from "../core/order/application/insert.order"
import ListOrdersByState from "../core/order/application/list.orders.by.state"
import AssignOrderToEmployee from "../core/order/application/assign.order.to.employee"
import NotifyOrderReady from "../core/order/application/notify.order.ready"
import CancelOrder from "../core/order/application/cancel.order"
import DeliverOrder from "../core/order/application/deliver.order"

import OrderPrismaRepository from "../core/order/infraestructure/prisma/order.prisma.repository"
import OrderUuidRepository from "../core/order/infraestructure/uuid/order.uuid.repository"
import OrderDishesPrismaRepository from "../core/orderdishes/infraestructure/prisma/orderdishes.prisma.repository"
import OrderDishesUuidRepository from "../core/orderdishes/infraestructure/uuid/orderdishes.uuid.repository"
import DishPrismaRepository from "../core/dish/infraestructure/prisma/dish.prisma.repository"
import RestaurantEmployeePrismaRepository from "../core/restaurantemployee/infraestructure/prisma/restaurant.employee.prisma.repository"
import MessageServiceRepository from "../core/order/infraestructure/services/message.service.repository"

const insertOrder = new InsertOrder(new OrderPrismaRepository, new OrderUuidRepository, new OrderDishesPrismaRepository, new OrderDishesUuidRepository, new DishPrismaRepository)
const listOrdersByState = new ListOrdersByState(new OrderPrismaRepository, new RestaurantEmployeePrismaRepository)
const assignOrderToEmployee = new AssignOrderToEmployee(new OrderPrismaRepository)
const notifyOrderReady = new NotifyOrderReady(new OrderPrismaRepository, new MessageServiceRepository)
const cancelOrder = new CancelOrder(new OrderPrismaRepository)
const deliverOrder = new DeliverOrder(new OrderPrismaRepository)

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
    const chefId = req.body.userId

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

export const assingOrderEmployee = async (req: Request, res: Response) => {
    const orderId = req.params.orderId
    const chefId = req.body.userId 

    try {
        const orderAssigned = await assignOrderToEmployee.assignOrder(orderId, chefId)

        res.status(200).json({
            status: 'OK',
            message: 'The order has been assigned and the status has been updated',
            data: orderAssigned
        })

    } catch (error:any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

export const notifyOrder = async (req: Request, res: Response) => {
    const orderId = req.params.orderId
    const body = req.body.body
    const to = req.body.to

    try {
        const orderNotify = await notifyOrderReady.notifyOrder(orderId, body, to)

        res.status(200).json({
            status: 'OK',
            message: 'Customer has been successfully notified',
            data: orderNotify
        })

    } catch (error:any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

export const cancelOrderByClient = async (req: Request, res: Response) => {
    const orderId = req.params.orderId
    const clientId = req.body.userId

    try {
        const orderCancelled = await cancelOrder.cancelOrder(orderId, clientId)

        res.status(200).json({
            status: 'OK',
            message: 'The order has been canceled',
            data: orderCancelled
        })

    } catch (error:any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

export const deliverOrderToClient = async (req: Request, res: Response) => {
    const orderId = req.params.orderId
    const pin = req.body.pin

    try {
        const orderDelivered = await deliverOrder.deliverOrder(orderId, pin)

        res.status(200).json({
            status: 'OK',
            message: 'The order has been canceled',
            data: orderDelivered
        })

    } catch (error:any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}