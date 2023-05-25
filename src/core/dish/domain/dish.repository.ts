import Dish from "./dish.model";


export default interface DishRepository {

    insertDish: (dish: Dish) => Promise<Dish>
    updateDishById: (dishId: string, dishDescription: string, dishPrice: number) => Promise<Dish>
    getDishById: (dishId: string) => Promise<Dish | null>

}