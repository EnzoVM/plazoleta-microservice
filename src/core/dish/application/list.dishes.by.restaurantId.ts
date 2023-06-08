import DishPersistanceRepository from "../domain/dish.persistance.repository"

export default class ListDishesByRestaurantId {
    private readonly dishPersistanceRepository: DishPersistanceRepository

    constructor(dishPersistanceRepository: DishPersistanceRepository) {
        this.dishPersistanceRepository = dishPersistanceRepository
    }

    async listDishes (page:number, limit: number, restaurantId: string){
        try {
            const dishesByRestaurant = await this.dishPersistanceRepository.listDishesByRestaurantId(restaurantId)
            if(!dishesByRestaurant){
                throw new Error('There are not dishes assigned to this restaurant')
            }
            
            const dishesGroupedByCategory = dishesByRestaurant.reduce((group, dish) => {
                const category = dish.categoryId

                if(!group[category]){
                    group[category] = []
                }
                group[category].push(dish)
                
                return group
            }, {})
            
            const dishListByCategoryAndPage = Object.keys(dishesGroupedByCategory).map((category) => {
                const dishesByCategory = dishesGroupedByCategory[category]
        
                const startIndex = (page-1) * limit
                const endIndex = page * limit

                const listDishes = dishesByCategory.slice(startIndex, endIndex)   
                return {category, dishes: listDishes}
            })

            return dishListByCategoryAndPage

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}