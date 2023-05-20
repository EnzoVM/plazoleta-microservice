import {
IsInt,
IsPositive, 
IsString, 
IsUrl, 
Min} from 'class-validator'

export default class DishDTO {

    @IsString()
    dishName: string 
    
    @IsString()
    categoryId: string
    
    @IsString({ groups: ['partialValidation']})
    dishDescription: string
    
    @IsInt({message: 'El número debe de ser entero', groups: ['partialValidation']})
    @IsPositive({message: 'El precio ingresado debe de ser positivo', groups: ['partialValidation']})
    @Min(1, {message: 'El número tiene que ser mayor a 0', groups: ['partialValidation']})
    dishPrice: number
    
    @IsString()
    restaurantId: string
    
    @IsUrl()
    @IsString()
    dishUrlImage: string

    constructor(dishName: string, categoryId: string, dishDescription: string, dishPrice: number, restaurantId: string, dishUrlImage: string) {
        this.dishName = dishName,
        this.categoryId = categoryId,
        this.dishDescription = dishDescription,
        this.dishPrice = dishPrice,
        this.restaurantId = restaurantId,
        this.dishUrlImage = dishUrlImage
    }
}