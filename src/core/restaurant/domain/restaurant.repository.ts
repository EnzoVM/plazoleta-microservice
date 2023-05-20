import Restaurant from "./restaurant.model";

export default interface RestaurantRepository {

    insertRestaurant: (restaurant: Restaurant) => Promise<Restaurant>
    getRestaurantById: (restaurantId: string) => Promise<Restaurant | null>

}