import RestaurantEmployeePersistanceRepository from "../domain/restaurant.employee.persistance.repository"

export default class GetRestaurantEmployeeByEmployeeId {
    private readonly restaurantEmployeePersistanceRepository: RestaurantEmployeePersistanceRepository
    
    constructor(restaurantEmployeePersistanceRepository: RestaurantEmployeePersistanceRepository) {
        this.restaurantEmployeePersistanceRepository = restaurantEmployeePersistanceRepository
    }

    async getRestaurantEmployee (chefId: string) {
        try {
            const restaurantEmployeeFound = await this.restaurantEmployeePersistanceRepository.getRestaurantEmployeeById(chefId)

            if(!restaurantEmployeeFound){
                throw new Error('Restaurant employee not found')
            }

            return restaurantEmployeeFound

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}