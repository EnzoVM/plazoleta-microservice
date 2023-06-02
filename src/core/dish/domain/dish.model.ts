
export default class Dish {
    dishId: string
    dishName: string
    categoryId: string
    dishDescription: string
    dishPrice: number
    restaurantId: string
    dishUrlImage: string
    dishActive: boolean
    
    constructor({dishId, dishName, categoryId, dishDescription, dishPrice, restaurantId, dishUrlImage, dishActive}:{dishId: string, dishName: string, categoryId: string, dishDescription: string, dishPrice: number, restaurantId: string, dishUrlImage: string, dishActive: boolean}) {
        this.dishId = dishId,
        this.dishName = dishName,
        this.categoryId = categoryId,
        this.dishDescription = dishDescription,
        this.dishPrice = dishPrice,
        this.restaurantId = restaurantId,
        this.dishUrlImage = dishUrlImage,
        this.dishActive = dishActive    
    }
}