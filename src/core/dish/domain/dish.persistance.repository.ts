import Dish from "./dish.model";

export default interface DishPersistanceRepository {

    insertDish: (dish: Dish) => Promise<Dish>
    updateDishById: (dishId: string, dishDescription: string, dishPrice: number) => Promise<Dish | null>
    getDishById: (dishId: string) => Promise<Dish | null>
    updateStateDishById: (dishId: string, dishActive: boolean) => Promise<Dish | null>
    listDishesByRestaurantId: (restaurantId: string) => Promise<Dish[] | null>
}