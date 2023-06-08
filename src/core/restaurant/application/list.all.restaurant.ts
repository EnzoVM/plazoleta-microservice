import RestaurantPersistanceRepository from "../domain/restaurant.persistance.repository";

export default class ListAllRestaurant {
    private readonly restaurantPersistanceRepository: RestaurantPersistanceRepository

    constructor(restaurantPersistanceRepository: RestaurantPersistanceRepository) {
        this.restaurantPersistanceRepository = restaurantPersistanceRepository
    }

    async listRestaurants (page: number, limit: number) {
        try {
            const listAllRestaurants = await this.restaurantPersistanceRepository.listAllRestaurants()
            const leakedRestaurants = listAllRestaurants.map((restaurant) => {
                return {
                    restaurantName: restaurant.restaurantName, 
                    restaurantUrlLogo: restaurant.restaurantUrlLogo
                }})

            const orderedRestaurants = leakedRestaurants.sort((a, b) => a.restaurantName.localeCompare(b.restaurantName))

            const startIndex = (page-1) * limit
            const endIndex = page * limit

            const listRestaurant = orderedRestaurants.slice(startIndex, endIndex)
            return listRestaurant

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}