
export default class RestaurantEmployee {
    restaurantEmployeeId: string
    restaurantId: string
    chefId: string
    
    constructor({restaurantEmployeeId, restaurantId, chefId}:{restaurantEmployeeId: string, restaurantId: string, chefId: string}) {
        this.restaurantEmployeeId = restaurantEmployeeId,
        this.restaurantId = restaurantId,
        this.chefId = chefId
    }
}