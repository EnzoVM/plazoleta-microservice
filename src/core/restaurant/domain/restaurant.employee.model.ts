import { v4 as uuid } from 'uuid'

export default class RestaurantEmployee {
    restaurantEmployeeId: string
    restaurantId: string
    chefId: string
    
    constructor(restaurantId: string, chefId: string) {
        this.restaurantEmployeeId = uuid(),
        this.restaurantId = restaurantId,
        this.chefId = chefId
    }
}