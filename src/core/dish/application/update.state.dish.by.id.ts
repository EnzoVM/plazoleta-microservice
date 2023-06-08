import DishPersistanceRepository from "../domain/dish.persistance.repository";

export default class UpdateStateDishById {
    private readonly dishPersistanceRepository: DishPersistanceRepository

    constructor(dishPersistanceRepository: DishPersistanceRepository) {
        this.dishPersistanceRepository = dishPersistanceRepository
    }

    async changeStateDish (dishId: string, dishActive: boolean) {
        try {
            if(dishActive === undefined){
                throw new Error('State is missing')
            }
    
            const dishUpdate = await this.dishPersistanceRepository.updateStateDishById(dishId, dishActive)
            if(!dishUpdate){
                throw new Error('Dish not found')
            }   
            return dishUpdate

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}