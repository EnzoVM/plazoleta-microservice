import RestaurantEmployee from "../domain/restaurant.employee.model";
import RestaurantRepository from "../domain/restaurant.repository";


export default class InsertRestaurantEmployee {
    private readonly restaurantRepository: RestaurantRepository

    constructor(restaurantRepository: RestaurantRepository) {
        this.restaurantRepository = restaurantRepository
    }

    async insertRestaurantEmployee (restaurantId: string, chefId: string){
        const newRestaurantEmployee = new RestaurantEmployee(restaurantId, chefId)
        const restaurantEmployeeSaved = await this.restaurantRepository.insertRestaurantEmployee(newRestaurantEmployee)
        return restaurantEmployeeSaved
    }
}