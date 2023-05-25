import {
IsNumber, 
IsNumberString, 
IsString, 
IsUrl, 
Matches,
MaxLength} from 'class-validator'

export default class RestaurantDTO {

    @IsString()
    @Matches(/^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$/, {message: 'La variable no puede ser solo números'})
    restaurantName: string

    @IsNumber()
    restaurantNIT: number

    @IsString()
    restaurantAddress: string

    @IsNumberString({}, {message: 'El valor ingresado debe de ser un numero'})
    @MaxLength(13, {message: 'El número ingresado es muy largo, solo se permite 13 caracteres'})
    @Matches(/^(\+)?\d+$/, {message: 'El valor debe de ser númerico y puede incluir el símbolo "+" al inicio'})
    restaurantPhoneNumber: string

    @IsUrl()
    @IsString()
    restaurantUrlLogo: string

    @IsString()
    ownerId: string

    constructor(restaurantName: string, restaurantNIT: number, restaurantAddress: string, restaurantPhoneNumber: string, restaurantUrlLogo: string, ownerId: string){
        this.restaurantName = restaurantName,
        this.restaurantNIT = restaurantNIT,
        this.restaurantAddress = restaurantAddress,
        this.restaurantPhoneNumber = restaurantPhoneNumber,
        this.restaurantUrlLogo = restaurantUrlLogo,
        this.ownerId = ownerId
    }
}