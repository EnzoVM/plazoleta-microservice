import { validate } from "class-validator"
import RestaurantDTO from "../domain/restaurant.dto"
import Restaurant from "../domain/restaurant.model"

import RestaurantPersistanceRepository from "../domain/restaurant.persistance.repository"
import ImageUploadRepository from "../domain/image.upload.repository"
import RestaurantIdGeneratorRepository from "../domain/restaurant.id.generator.repository"
import RestaurantServiceRepository from "../domain/restaurant.service.repository"

export default class InsertRestaurant {
    private readonly restaurantPersistanceRepository: RestaurantPersistanceRepository
    private readonly imageUploadRepository: ImageUploadRepository
    private readonly restaurantIdGeneratorRepository: RestaurantIdGeneratorRepository
    private readonly restaurantServiceRepository: RestaurantServiceRepository

    constructor(restaurantPersistanceRepository: RestaurantPersistanceRepository, imageUploadRepository: ImageUploadRepository, restaurantIdGeneratorRepository: RestaurantIdGeneratorRepository, restaurantServiceRepository: RestaurantServiceRepository) {
        this.restaurantPersistanceRepository = restaurantPersistanceRepository,
        this.imageUploadRepository = imageUploadRepository,
        this.restaurantIdGeneratorRepository = restaurantIdGeneratorRepository,
        this.restaurantServiceRepository = restaurantServiceRepository
    }
    
    async createRestaurant (restaurantName: string, restaurantNIT: number, restaurantAddress: string, restaurantPhoneNumber: string, restaurantUrlLogo: string, ownerId: string) {
        try {
            const errorDataRestaurant = await validate(new RestaurantDTO({
                restaurantName, 
                restaurantNIT, 
                restaurantAddress, 
                restaurantPhoneNumber, 
                restaurantUrlLogo, 
                ownerId
            }))
            if(errorDataRestaurant.length > 0){
                const errorMessages = errorDataRestaurant.map((error) => error.constraints ? Object.values(error.constraints): []).flat()
                throw new Error(errorMessages.join(', '))
            }
            
            const roleName = await this.restaurantServiceRepository.getRoleByUserId(ownerId)
            if(roleName.data !== 'Owner'){      
                throw new Error('The entered role does not belong to an owner')
            }
            
            const restaurantId = this.restaurantIdGeneratorRepository.generateRestaurantId()
            const restaurantUrlLogoUpload = await this.imageUploadRepository.uploadImage(restaurantUrlLogo)
            
            const newRestaurant = new Restaurant({
                restaurantId: restaurantId, 
                restaurantName: restaurantName, 
                restaurantNIT: restaurantNIT, 
                restaurantAddress: restaurantAddress, 
                restaurantPhoneNumber: restaurantPhoneNumber, 
                restaurantUrlLogo: restaurantUrlLogoUpload, 
                ownerId: ownerId
            })
            const restaurantInserted = await this.restaurantPersistanceRepository.insertRestaurant(newRestaurant)
            return restaurantInserted

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}