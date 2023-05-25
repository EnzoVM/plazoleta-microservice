import { v4 as uuid } from 'uuid'

export default class Dish {
    dishId: string
    dishName: string
    categoryId: string
    dishDescription: string
    dishPrice: number
    restaurantId: string
    dishUrlImage: string
    dishActive: boolean
    
    constructor(dishName: string, categoryId: string, dishDescription: string, dishPrice: number, restaurantId: string, dishUrlImage: string, dishActive: boolean) {
        this.dishId = uuid(),
        this.dishName = dishName,
        this.categoryId = categoryId,
        this.dishDescription = dishDescription,
        this.dishPrice = dishPrice,
        this.restaurantId = restaurantId,
        this.dishUrlImage = dishUrlImage,
        this.dishActive = dishActive    
    }
}