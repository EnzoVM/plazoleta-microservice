import Dish from "../domain/dish.model"
import {validate} from 'class-validator'
import DishDTO from "../domain/dish.dto"
import DishPersistanceRepository from "../domain/dish.persistance.repository"
import DishImageUploadRepository from "../domain/dish.image.upload.repository"
import DishIdGeneratorRepository from "../domain/dish.id.generator.repository"

export default class InsertDish {
    private readonly dishPersistanceRepository: DishPersistanceRepository
    private readonly dishImageUploadRepository: DishImageUploadRepository
    private readonly dishIdGenerateRepository: DishIdGeneratorRepository

    constructor(dishPersistanceRepository: DishPersistanceRepository, dishImageUploadRepository: DishImageUploadRepository, dishIdGenerateRepository: DishIdGeneratorRepository) {
        this.dishPersistanceRepository = dishPersistanceRepository,
        this.dishImageUploadRepository = dishImageUploadRepository,
        this.dishIdGenerateRepository = dishIdGenerateRepository      
    }

    async createDish (dishName: string, categoryId: string, dishDescription: string, dishPrice: number, restaurantId: string, dishUrlImage: string) {
        try {
            const errorDataDish = await validate(new DishDTO({
                dishName, 
                categoryId, 
                dishDescription, 
                dishPrice, 
                restaurantId, 
                dishUrlImage
            }))
            if(errorDataDish.length > 0){
                const errorMessages = errorDataDish.map((error) => error.constraints ? Object.values(error.constraints): []).flat()
                throw new Error(errorMessages.join(', '))
            }
            
            const dishId = this.dishIdGenerateRepository.generateDishId()
            const dishUrlImageUpload = await this.dishImageUploadRepository.uploadImage(dishUrlImage)
            
            const newDish = new Dish({
                dishId: dishId, 
                dishName: dishName, 
                categoryId: categoryId, 
                dishDescription: dishDescription, 
                dishPrice: dishPrice, 
                restaurantId: restaurantId, 
                dishUrlImage: dishUrlImageUpload, 
                dishActive: true
            })
            const dishInserted = await this.dishPersistanceRepository.insertDish(newDish)
            return dishInserted 

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}