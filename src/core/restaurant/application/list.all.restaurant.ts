import RestaurantRepository from "../domain/restaurant.repository";


export default class ListAllRestaurant {
    private readonly restaurantRepository: RestaurantRepository

    constructor(restaurantRepository: RestaurantRepository) {
        this.restaurantRepository = restaurantRepository
    }

    async listRestaurants (itemsPerPage: number) {
        const listAllRestaurants = await this.restaurantRepository.listAllRestaurants()
        const leakedRestaurants = listAllRestaurants.map((restaurant) => {
            return {
                restaurantName: restaurant.restaurantName, 
                restaurantUrlLogo: restaurant.restaurantUrlLogo
            }})

        const numOfpages = Math.ceil(leakedRestaurants.length/itemsPerPage)

        const orderedRestaurants = leakedRestaurants.sort((a, b) => a.restaurantName.localeCompare(b.restaurantName))
        const listRestaurantsPerPage: {}[] = []

        for(let page=1; page <=numOfpages; page++){
            const firstItemOfPage = (page-1)*itemsPerPage
            const lastItemOfPage = firstItemOfPage + itemsPerPage

            const listRestaurant = orderedRestaurants.slice(firstItemOfPage, lastItemOfPage)
            listRestaurantsPerPage.push(listRestaurant)
        }
        return listRestaurantsPerPage
    }
}