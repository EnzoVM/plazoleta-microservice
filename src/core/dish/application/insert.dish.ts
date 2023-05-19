import Dish from "../domain/dish.model";
import DishRepository from "../domain/dish.repository";
import {validate} from 'class-validator'
import DishDTO from "../domain/dish.dto"
import RestaurantPrismaRepository from "../../restaurant/infraestructure/prisma/restaurant.prisma.repository"
import GetRestaurantById from "../../restaurant/application/get.restaurant.by.id"
import ImageUploadRepository from "../domain/image.upload.repository";

const getRestaurantById = new GetRestaurantById(new RestaurantPrismaRepository)

export default class InsertDish {
    private readonly dishRepository: DishRepository
    private readonly imageUploadRepository: ImageUploadRepository

    constructor(dishRepository: DishRepository, imageUploadRepository: ImageUploadRepository) {
        this.dishRepository = dishRepository 
        this.imageUploadRepository = imageUploadRepository       
    }

    async createNewDish (dishName: string, categoryId: string, dishDescription: string, dishPrice: number, restaurantId: string, dishUrlImage: string) {

        if(!dishName || !categoryId || !dishDescription || !dishPrice || !restaurantId || !dishUrlImage){
            throw new Error('Data is missing')
        }

        const errorDataDish = await validate(new DishDTO(dishName, categoryId, dishDescription, dishPrice, restaurantId, dishUrlImage))
        if(errorDataDish.length > 0){
            throw new Error('The dish data entered is not correct')
        }

        const restaurantFound = await getRestaurantById.getRestaurantById(restaurantId)
        if(!restaurantFound){
            throw new Error('The id entered does not belong to a restaurant')
        }

        const dishUrlImageUpload = await this.imageUploadRepository.uploadImage(dishUrlImage)

        const newDish = new Dish(dishName, categoryId, dishDescription, dishPrice, restaurantId, dishUrlImageUpload, true)
        const dishInserted = await this.dishRepository.insertNewDish(newDish)
        return dishInserted
    }
}