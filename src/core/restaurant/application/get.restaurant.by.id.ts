import RestaurantRepository from "../domain/restaurant.repository"


export default class GetRestaurantById {
    private readonly restaurantRepository: RestaurantRepository

    constructor(restaurantRepository: RestaurantRepository) {
        this.restaurantRepository = restaurantRepository
    }

    async getRestaurantById (restaurantId: string) {
        const restaurantFound = await this.restaurantRepository.getRestaurantById(restaurantId)
        return restaurantFound
    }
}