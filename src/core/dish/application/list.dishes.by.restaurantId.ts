import DishRepository from "../domain/dish.repository";


export default class ListDishesByRestaurantId {
    private readonly dishRepository: DishRepository

    constructor(dishRepository: DishRepository) {
        this.dishRepository = dishRepository
    }

    async listDishes (itemsPerPage: number, restaurantId: string){
        const dishesByRestaurant = await this.dishRepository.listDishesByRestaurantId(restaurantId)
        const dishesGroupedByCategory = dishesByRestaurant.reduce((group, dish) => {
            const category = dish.categoryId
            if(!group[category]){
                group[category] = []
            }
            group[category].push(dish)
            return group
        }, {})
        
        Object.keys(dishesGroupedByCategory).map((category) => {
            const arrayListDishes: {}[] = []
            const dishesByCategory = dishesGroupedByCategory[category]
            const numOfpages = Math.ceil(dishesByCategory.length/itemsPerPage)
            for(let page=1; page <=numOfpages; page++){
                const firstItemOfPage = (page-1)*itemsPerPage
                const lastItemOfPage = firstItemOfPage+itemsPerPage

                const listDishes = dishesByCategory.slice(firstItemOfPage, lastItemOfPage)
                arrayListDishes.push(listDishes)
            }
            dishesGroupedByCategory[category] = arrayListDishes
        })

        return dishesGroupedByCategory

    }
}