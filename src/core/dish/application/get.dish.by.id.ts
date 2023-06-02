import DishPersistanceRepository from "../domain/dish.persistance.repository"

export default class GetDishById {
    private readonly dishPersistanceRepository: DishPersistanceRepository

    constructor(dishPersistanceRepository: DishPersistanceRepository) {
        this.dishPersistanceRepository = dishPersistanceRepository
    }

    async getDishById (dishId: string) {
        try {
            const dishFound = await this.dishPersistanceRepository.getDishById(dishId)
        
            if(!dishFound){
                throw new Error('The dish does not exit')
            }

            return dishFound

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}