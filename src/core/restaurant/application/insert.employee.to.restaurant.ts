import RestaurantEmployee from "../domain/restaurant.employee.model";
import RestaurantRepository from "../domain/restaurant.repository";


export default class InsertEmployeeToRestaurant {
    private readonly restaurantRepository: RestaurantRepository

    constructor(restaurantRepository: RestaurantRepository) {
        this.restaurantRepository = restaurantRepository
    }

    async insertEmployeeToRestaurant (restaurantId: string, chefId: string){
        const newRestaurantEmployee = new RestaurantEmployee(restaurantId, chefId)
        const restaurantEmployeeSaved = await this.restaurantRepository.insertEmployeeToRestaurant(newRestaurantEmployee)
        return restaurantEmployeeSaved
    }
}