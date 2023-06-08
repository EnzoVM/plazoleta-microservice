import {
IsInt,
IsNotEmpty,
IsString} from 'class-validator'
    
export default class OrderDishesDTO {

    @IsNotEmpty({message: 'Order ID is empty'})
    @IsString({message: 'Order ID must be a string'})
    orderId: string 
    
    @IsNotEmpty({message: 'Dish ID is empty'})
    @IsString({message: 'Dish ID must be a string'})
    dishId: string
    
    @IsNotEmpty({message: 'Quantity is empty'})
    @IsInt({ message: 'Quantity must be an integer'})
    cantidad: number
    
    constructor({orderId, dishId, cantidad}:{orderId: string, dishId: string, cantidad: number}) {
        this.orderId = orderId,
        this.dishId = dishId,
        this.cantidad = cantidad
    }
}
