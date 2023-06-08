import {validate} from 'class-validator'
import OrderDishesDTO from '../domain/orderdishes.dto'
import OrderDishes from "../domain/orderdishes.model"
import OrderDishesIdGeneratorRepository from "../domain/orderdishes.id.generator.repository"
import OrderDishesPersistanceRepository from "../domain/orderdishes.persistance.repository"

export default class InsertOrderDishes {
    private readonly orderDishesPersistanceRepository: OrderDishesPersistanceRepository
    private readonly orderDishesIdGeneratorRepository: OrderDishesIdGeneratorRepository

    constructor(orderDishesPersistanceRepository: OrderDishesPersistanceRepository, orderDishesIdGeneratorRepository: OrderDishesIdGeneratorRepository) {
        this.orderDishesPersistanceRepository = orderDishesPersistanceRepository,
        this.orderDishesIdGeneratorRepository = orderDishesIdGeneratorRepository
    }
    
    async create (orderId: string, dishId: string, cantidad: number){
        try {
            const errorDataOrderDishes = await validate(new OrderDishesDTO({
                orderId,
                dishId,
                cantidad
            }))
            if(errorDataOrderDishes.length > 0){
                const errorMessages = errorDataOrderDishes.map((error) => error.constraints ? Object.values(error.constraints): []).flat()
                throw new Error(errorMessages.join(', '))
            }

            const orderDishesId = this.orderDishesIdGeneratorRepository.generateOrderDishesId()
            
            const newOrderDishes = new OrderDishes({
                orderDishesId, 
                orderId, 
                dishId, 
                cantidad
            })
            const orderDishesSaved = await this.orderDishesPersistanceRepository.insertOrderDishes(newOrderDishes)
            return orderDishesSaved

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}