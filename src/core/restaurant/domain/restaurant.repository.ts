import RestaurantEmployee from "./restaurant.employee.model";
import Restaurant from "./restaurant.model";

export default interface RestaurantRepository {

    insertRestaurant: (restaurant: Restaurant) => Promise<Restaurant>
    getRestaurantById: (restaurantId: string) => Promise<Restaurant | null>
    insertEmployeeToRestaurant: (restaurantEmployee: RestaurantEmployee) => Promise<RestaurantEmployee>
    listAllRestaurants: () => Promise<Restaurant[]>
    
}