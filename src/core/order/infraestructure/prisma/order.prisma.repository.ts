import prisma from "../../../../connections/prisma.connection"
import Order from "../../domain/order.model"
import OrderPersistanceRepository from "../../domain/order.persistance.repository"

export default class OrderPrismaRepository implements OrderPersistanceRepository {
    
    async insertOrder (order: Order): Promise<Order> {
        try {
            const orderSaved = await prisma.orders.create({
                data: {
                    orderId: order.orderId,
                    clientId: order.clientId,
                    orderState: order.orderState,
                    restaurantId: order.restaurantId
                }
            })

            return orderSaved

        } catch (error:any) {
            throw new Error('ERROR IN CREATE ORDER')
        }
    }

    async getOrderByClientId (clientId: string): Promise<Order[] | null>{
        try {
            const orderFound = await prisma.orders.findMany({
                where:{
                    clientId
                }
            })

            return orderFound

        } catch (error: any) {
            throw new Error ('ERROR IN GET ORDER BY CLIENT ID')
        }
    }

    async listAllOrdersByState (orderState: string, restaurantId: string): Promise<Order[] | null> {
        try {
            const ordersFound = await prisma.orders.findMany({
                where: {
                    orderState,
                    restaurantId
                },
                include:{
                    orderDishes: true
                }
            })

            return ordersFound

        } catch (error: any) {
            throw new Error ('ERROR IN LIST ALL ORDERS BY STATE')
        }
    }

    async updateOrderByOrderId (orderId: string, orderState: string, chefId: string): Promise<Order | null>{
        try {
            const orderUpdated = await prisma.orders.update({
                where:{
                    orderId
                },
                data: {
                    orderState,
                    chefId
                }
            })

            return orderUpdated

        } catch (error: any) {
            throw new Error('ERROR IN UPDATE ORDER BY ORDER ID')
        }
    }

    async getOrderByOrderId (orderId: string): Promise<Order | null> {
        try {
            const orderFound = await prisma.orders.findUnique({
                where: {
                    orderId
                }
            })

            return orderFound

        } catch (error:any) {
            throw new Error('ERROR IN GET ORDER BY ORDER ID')
        }
    }
    
}