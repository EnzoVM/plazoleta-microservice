import prisma from "../../../../connections/prisma.connection"
import OrderDishes from "../../domain/orderdishes.model"
import OrderDishesPersistanceRepository from "../../domain/orderdishes.persistance.repository"

export default class OrderDishesPrismaRepository implements OrderDishesPersistanceRepository {

    async insertOrderDishes (orderDishes: OrderDishes): Promise<OrderDishes> {
        try {
            const orderDishesSaved = await prisma.orderDishes.create({
                data: {
                    orderDishesId: orderDishes.orderDishesId,
                    orderId: orderDishes.orderId,
                    dishId: orderDishes.dishId,
                    cantidad: orderDishes.cantidad
                }
            })
            
            return orderDishesSaved
            
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}