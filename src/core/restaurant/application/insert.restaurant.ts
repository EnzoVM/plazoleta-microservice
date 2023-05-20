import RestaurantRepository from "../domain/restaurant.repository"
import { validate } from "class-validator"
import RestaurantDTO from "../domain/restaurant.dto"
import Restaurant from "../domain/restaurant.model"
import { getRoleIdUserByIdentification } from "../infraestructure/services/user.service"
import ImageUploadRepository from "../domain/image.upload.repository"

export default class InsertRestaurant {
    private readonly restaurantRepository: RestaurantRepository
    private readonly imageUploadRepository: ImageUploadRepository

    constructor(restaurantRepository: RestaurantRepository, imageUploadRepository: ImageUploadRepository) {
        this.restaurantRepository = restaurantRepository,
        this.imageUploadRepository = imageUploadRepository
    }
    
    async createRestaurant (restaurantName: string, restaurantNIT: number, restaurantAddress: string, restaurantPhoneNumber: string, restaurantUrlLogo: string, ownerId: string) {
        
        if(!restaurantName || !restaurantNIT || !restaurantAddress || !restaurantPhoneNumber || !restaurantUrlLogo || !ownerId) {
            throw new Error ('Data is missing')
        }

        const errorDataRestaurant = await validate(new RestaurantDTO(restaurantName, restaurantNIT, restaurantAddress, restaurantPhoneNumber, restaurantUrlLogo, ownerId))
        if(errorDataRestaurant.length > 0){
            throw new Error('The restaurant data entered is not correct')
        }
        
        const roleName = await getRoleIdUserByIdentification(ownerId)
        if(roleName.data !== 'Owner'){
            throw new Error('The entered role does not belong to an owner')
        }
        
        const restaurantUrlLogoUpload = await this.imageUploadRepository.uploadImage(restaurantUrlLogo)
        
        const newRestaurant = new Restaurant(restaurantName, restaurantNIT, restaurantAddress, restaurantPhoneNumber, restaurantUrlLogoUpload, ownerId)
        const restaurantInserted = await this.restaurantRepository.insertRestaurant(newRestaurant)
        return restaurantInserted
    }
}