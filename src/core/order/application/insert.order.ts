import OrderIdGenerateRepository from "../domain/order.id.generator.repository"
import OrderPersistanceRepository from "../domain/order.persistance.repository"
import Order from "../domain/order.model"

import DishPersistanceRepository from "../../dish/domain/dish.persistance.repository"
import OrderDishesPersistanceRepository from "../../orderdishes/domain/orderdishes.persistance.repository"
import OrderDishesIdGeneratorRepository from "../../orderdishes/domain/orderdishes.id.generator.repository"
import OrderDishes from "../../orderdishes/domain/orderdishes.model"

export default class InsertOrder {
    private readonly orderPersistanceRepository: OrderPersistanceRepository
    private readonly orderIdGenerateRepository: OrderIdGenerateRepository
    private readonly orderDishesPersistanceRepository: OrderDishesPersistanceRepository
    private readonly orderDishesIdGeneratorRepository: OrderDishesIdGeneratorRepository
    private readonly dishPersistanceRepository: DishPersistanceRepository

    constructor(orderPersistanceRepository: OrderPersistanceRepository, orderIdGenerateRepository: OrderIdGenerateRepository, orderDishesPersistanceRepository: OrderDishesPersistanceRepository, orderDishesIdGeneratorRepository: OrderDishesIdGeneratorRepository, dishPersistanceRepository: DishPersistanceRepository) {
        this.orderPersistanceRepository = orderPersistanceRepository,
        this.orderIdGenerateRepository = orderIdGenerateRepository,
        this.orderDishesPersistanceRepository = orderDishesPersistanceRepository,
        this.orderDishesIdGeneratorRepository = orderDishesIdGeneratorRepository,
        this.dishPersistanceRepository = dishPersistanceRepository
    }

    async create (clientId: string, restaurantId: string, dishes: {dishId: string, cantidad:number}[]){
        try {
            //Validate if the user have orders pending, in preparation or ready
            const ordersFound = await this.orderPersistanceRepository.getOrderByClientId(clientId)
            if(!ordersFound){
                throw new Error('There are no orders assigned to this client')
            }
            for(const order of ordersFound){
                if(order.orderState === 'Pending') { throw new Error('You have an order with pending status')}
                if(order.orderState === 'In preparation') { throw new Error('You have an order with in preparation status')}
                if(order.orderState === 'Ready') {throw new Error('You have an order with ready status')}
            }
            
            //Validate dishes with restaurant id
            await Promise.all(
                dishes.map(async (dish) => {
                    const dishFound = await this.dishPersistanceRepository.getDishById(dish.dishId)
                    if(!dishFound){
                        throw new Error('Dish not found')
                    }
                    if(restaurantId !== dishFound.restaurantId){
                        throw new Error('The dishes do not belong to the same restaurant')
                    }
                })
            )
                
            //Generate the order
            const orderId = this.orderIdGenerateRepository.generateOrderId()
            const newOrder = new Order({
                orderId: orderId, 
                clientId: clientId, 
                orderState: 'Pending', 
                restaurantId: restaurantId
            })
            const orderSaved = await this.orderPersistanceRepository.insertOrder(newOrder)
            
            //Generate orderDishes
            const arrayOrderDishes: {}[] = []
            await Promise.all(
                dishes.map(async (dish) => {
                    const orderDishesId = await this.orderDishesIdGeneratorRepository.generateOrderDishesId()
                    const orderDishes = await this.orderDishesPersistanceRepository.insertOrderDishes(new OrderDishes({
                        orderDishesId: orderDishesId,
                        orderId: orderSaved.orderId,
                        dishId: dish.dishId,
                        cantidad: dish.cantidad
                    }))
                    arrayOrderDishes.push(orderDishes)
                })
            )
            
            return {
                order: orderSaved, 
                dishes: arrayOrderDishes
            }

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}