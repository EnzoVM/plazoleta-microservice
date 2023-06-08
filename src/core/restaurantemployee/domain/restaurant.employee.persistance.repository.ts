import RestaurantEmployee from "./restaurant.employee.model";

export default interface RestaurantEmployeePersistanceRepository {
    
    insertEmployeeToRestaurant: (restaurantEmployee: RestaurantEmployee) => Promise<RestaurantEmployee>
    getRestaurantEmployeeById: (chefId: string) => Promise<RestaurantEmployee | null>
}