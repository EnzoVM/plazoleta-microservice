import Dish from "./dish.model";


export default interface DishRepository {

    insertNewDish: (dish: Dish) => Promise<Dish>

}