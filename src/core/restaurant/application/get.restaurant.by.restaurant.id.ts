import RestaurantPersistanceRepository from "../domain/restaurant.persistance.repository"

export default class GetRestaurantByRestaurantId {
    private readonly restaurantPersistanceRepository: RestaurantPersistanceRepository

    constructor(restaurantPersistanceRepository: RestaurantPersistanceRepository) {
        this.restaurantPersistanceRepository = restaurantPersistanceRepository
    }

    async getRestaurantById (restaurantId: string) {
        try {
            const restaurantFound = await this.restaurantPersistanceRepository.getRestaurantById(restaurantId)

            if(!restaurantFound){
                throw new Error('Restaurant not found')
            }

            return restaurantFound

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}