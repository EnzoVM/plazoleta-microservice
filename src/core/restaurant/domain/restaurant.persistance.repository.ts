import Restaurant from "./restaurant.model"

export default interface RestaurantPersistanceRepository {

    insertRestaurant: (restaurant: Restaurant) => Promise<Restaurant>
    getRestaurantById: (restaurantId: string) => Promise<Restaurant | null>
    listAllRestaurants: () => Promise<Restaurant[]>
    
}