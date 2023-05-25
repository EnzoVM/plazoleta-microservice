import { log } from "console";
import DishRepository from "../domain/dish.repository";


export default class UpdateStateDishById {
    private readonly dishRepository: DishRepository

    constructor(dishRepository: DishRepository) {
        this.dishRepository = dishRepository
    }

    async changeStateDish (dishId: string, dishActive: boolean) {

        if(dishActive === undefined){
            throw new Error('Data is missing')
        }

        const dishUpdate = await this.dishRepository.updateStateDishById(dishId, dishActive)    
        return dishUpdate
    }
}