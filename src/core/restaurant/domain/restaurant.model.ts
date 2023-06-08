
export default class Restaurant {
    restaurantId: string
    restaurantName: string
    restaurantNIT: number
    restaurantAddress: string
    restaurantPhoneNumber: string
    restaurantUrlLogo: string
    ownerId: string
    
    constructor({restaurantId, restaurantName, restaurantNIT, restaurantAddress, restaurantPhoneNumber, restaurantUrlLogo, ownerId}:{restaurantId: string, restaurantName: string, restaurantNIT: number, restaurantAddress: string, restaurantPhoneNumber: string, restaurantUrlLogo: string, ownerId: string}){
        this.restaurantId = restaurantId,
        this.restaurantName = restaurantName,
        this.restaurantNIT = restaurantNIT,
        this.restaurantAddress = restaurantAddress,
        this.restaurantPhoneNumber = restaurantPhoneNumber,
        this.restaurantUrlLogo = restaurantUrlLogo,
        this.ownerId = ownerId
    }
}