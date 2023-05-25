import { validate } from "class-validator";
import DishRepository from "../domain/dish.repository";
import DishDTO from "../domain/dish.dto";

export default class UpdateDishById {
    private readonly dishRepository: DishRepository

    constructor(dishRepository: DishRepository) {
        this.dishRepository = dishRepository
    }

    async updateDish (dishId: string, dishDescription: string, dishPrice: number) {
        
        if(!dishId || !dishDescription || !dishPrice){
            throw new Error('Data is missing')
        }
        
        const errorDataDish = await validate(new DishDTO("", "", dishDescription, dishPrice, "", ""), {groups: ['partialValidation']})
        if(errorDataDish.length > 0){
            throw new Error('The description or price entered are incorrect')
        }

        const dishUpdated = await this.dishRepository.updateDishById(dishId, dishDescription, dishPrice)
        return dishUpdated
    }
}