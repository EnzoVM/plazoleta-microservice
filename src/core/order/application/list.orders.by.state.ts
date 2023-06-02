import OrderPersistanceRepository from "../domain/order.persistance.repository"
import RestaurantEmployeePersistanceRepository from "../../restaurantemployee/domain/restaurant.employee.persistance.repository"

export default class ListOrdersByState {
    private readonly orderPersistanceRepository: OrderPersistanceRepository
    private readonly restaurantEmployeePersistanceRepository: RestaurantEmployeePersistanceRepository
    
    constructor(orderPersistanceRepository: OrderPersistanceRepository, restaurantEmployeePersistanceRepository: RestaurantEmployeePersistanceRepository) {
        this.orderPersistanceRepository = orderPersistanceRepository,
        this.restaurantEmployeePersistanceRepository = restaurantEmployeePersistanceRepository
    }

    async listOrders (chefId: string, orderState: string, page: number, limit: number){
        try {
            const restaurantEmployeeFound = await this.restaurantEmployeePersistanceRepository.getRestaurantEmployeeById(chefId)
            if(!restaurantEmployeeFound){
                throw new Error('The restaurant does not exist')
            }
            
            const orderList = await this.orderPersistanceRepository.listAllOrdersByState(orderState, restaurantEmployeeFound.restaurantId)

            const startIndex = (page-1) * limit
            const endIndex = page * limit

            const paginatedOrders = await orderList.slice(startIndex, endIndex)
            return paginatedOrders

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}