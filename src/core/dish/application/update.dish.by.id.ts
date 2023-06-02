import { validate } from "class-validator";
import DishPersistanceRepository from "../domain/dish.persistance.repository";
import DishDTO from "../domain/dish.dto";

export default class UpdateDishById {
    private readonly dishPersistanceRepository: DishPersistanceRepository

    constructor(dishPersistanceRepository: DishPersistanceRepository) {
        this.dishPersistanceRepository = dishPersistanceRepository
    }

    async updateDish (dishId: string, dishDescription: string, dishPrice: number) {
        try {     
            //@ts-ignore
            const errorDataDish = await validate(new DishDTO({
                dishDescription: dishDescription, 
                dishPrice: dishPrice
            }), {groups: ['partialValidation']})
            if(errorDataDish.length > 0){
                const errorMessages = errorDataDish.map((error) => error.constraints ? Object.values(error.constraints): []).flat()
                throw new Error(errorMessages.join(', '))
            }
    
            const dishUpdated = await this.dishPersistanceRepository.updateDishById(dishId, dishDescription, dishPrice)
            return dishUpdated

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}