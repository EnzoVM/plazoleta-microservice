import RestaurantRepository from "../domain/restaurant.repository"
import { validate } from "class-validator"
import RestaurantDTO from "../domain/restaurant.dto"
import Restaurant from "../domain/restaurant.model"

export default class InsertRestaurant {
    private readonly restaurantRepository: RestaurantRepository

    constructor(restaurantRepository: RestaurantRepository) {
        this.restaurantRepository = restaurantRepository
    }
    
    async createNewRestaurant (restaurantName: string, restaurantNIT: number, restaurantAddress: string, restaurantPhoneNumber: string, restaurantUrlLogo: string, ownerId: string) {
        
        if(!restaurantName && !restaurantNIT && !restaurantAddress && !restaurantPhoneNumber && !restaurantUrlLogo && !ownerId) {
            throw new Error ('Data is missing')
        }

        const errorDataRestaurant = await validate(new RestaurantDTO(restaurantName, restaurantNIT, restaurantAddress, restaurantPhoneNumber, restaurantUrlLogo, ownerId))
        if(errorDataRestaurant.length > 0){
            console.log(errorDataRestaurant);
            throw new Error("You have to specify the requested restaurant's data")
        }
        
        
        const newRestaurant = new Restaurant(restaurantName, restaurantNIT, restaurantAddress, restaurantPhoneNumber, restaurantUrlLogo, ownerId)
        const restaurantInserted = await this.restaurantRepository.insertNewRestaurant(newRestaurant)
        return restaurantInserted
    }
}