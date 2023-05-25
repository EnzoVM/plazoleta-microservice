import DishRepository from "../domain/dish.repository";

export default class GetDishById {
    private readonly dishRepository: DishRepository

    constructor(dishRepository: DishRepository) {
        this.dishRepository = dishRepository
    }

    async getDishById (dishId: string) {
        const dishFound = await this.dishRepository.getDishById(dishId)
        return dishFound
    }
}