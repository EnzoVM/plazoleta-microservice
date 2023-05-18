import {v4 as uuid} from 'uuid'

export default class Restaurant {
    restaurantId: string
    restaurantName: string
    restaurantNIT: number
    restaurantAddress: string
    restaurantPhoneNumber: string
    restaurantUrlLogo: string
    ownerId: string

    constructor(restaurantName: string, restaurantNIT: number, restaurantAddress: string, restaurantPhoneNumber: string, restaurantUrlLogo: string, ownerId: string){
        this.restaurantId = uuid(),
        this.restaurantName = restaurantName,
        this.restaurantNIT = restaurantNIT,
        this.restaurantAddress = restaurantAddress,
        this.restaurantPhoneNumber = restaurantPhoneNumber,
        this.restaurantUrlLogo = restaurantUrlLogo,
        this.ownerId = ownerId
    }
}