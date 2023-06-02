import {
IsInt,
IsNotEmpty,
IsPositive, 
IsString, 
IsUrl, 
Min} from 'class-validator'

export default class DishDTO {

    @IsNotEmpty({message: 'Name of dish is empty'})
    @IsString({message: 'Name of dish must be a string'})
    dishName: string 
    
    @IsNotEmpty({message: 'Category of dish is empty'})
    @IsString({message: 'Category of dish must be a string'})
    categoryId: string
    
    @IsNotEmpty({message: 'Description of dish is empty', groups: ['partialValidation']})
    @IsString({ message: 'Description of dish must be a string', groups: ['partialValidation']})
    dishDescription: string
    
    @IsNotEmpty({message: 'Price of dish is empty'})
    @IsInt({message: 'Price of dish must be an integer', groups: ['partialValidation']})
    @IsPositive({message: 'Price of the dish must be positive', groups: ['partialValidation']})
    @Min(1, {message: 'Price of the dish must be greater than 0', groups: ['partialValidation']})
    dishPrice: number
    
    @IsNotEmpty({message: 'Restaurant of dish is empty'})
    @IsString({message: 'Restaurant of dish must be a string'})
    restaurantId: string
    
    @IsNotEmpty({message: 'Url of dish is empty'})
    @IsUrl({}, {message: 'Url of dish is not valid'})
    @IsString({message: 'Url of dish must be a string'})
    dishUrlImage: string

    constructor({dishName, categoryId, dishDescription, dishPrice, restaurantId, dishUrlImage}:{dishName: string, categoryId: string, dishDescription: string, dishPrice: number, restaurantId: string, dishUrlImage: string}) {
        this.dishName = dishName,
        this.categoryId = categoryId,
        this.dishDescription = dishDescription,
        this.dishPrice = dishPrice,
        this.restaurantId = restaurantId,
        this.dishUrlImage = dishUrlImage
    }
}