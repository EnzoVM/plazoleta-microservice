import Restaurant from "./restaurant.model";

export default interface RestaurantRepository {

    insertNewRestaurant: (restaurant: Restaurant) => Promise<Restaurant>
    
}