import {
IsNotEmpty,
IsNumber, 
IsNumberString, 
IsString, 
IsUrl, 
Matches,
MaxLength} from 'class-validator'

export default class RestaurantDTO {

    @IsNotEmpty({message: 'Name of restaurant is empty'})
    @IsString({message: 'Name of restaurant must be a string'})
    @Matches(/^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$/, {message: 'Name of the restaurant can not be just numbers'})
    restaurantName: string

    @IsNotEmpty({message: 'Identification of restaurant is empty'})
    @IsNumber({}, {message: 'Identification of restaurant must be an integer'})
    restaurantNIT: number

    @IsNotEmpty({message: 'Address of restaurant is empty'})
    @IsString({message: 'Address of restaurant must be a string'})
    restaurantAddress: string

    @IsNotEmpty({message: 'Phone number of restaurant is empty'})
    @IsNumberString({}, {message: 'Phone number of restaurant must be an integer'})
    @MaxLength(13, {message: 'Phone number of restaurant is very long, only 13 characters are allowed'})
    @Matches(/^(\+)?\d+$/, {message: 'Phone number of restaurant must be numeric and can include the + symbol at the beginning'})
    restaurantPhoneNumber: string

    @IsNotEmpty({message: 'Url logo of restaurant is empty'})
    @IsUrl({}, {message: 'Url logo of restaurant validate is wrong'})
    @IsString({message: 'Url logo of restaurant must be a string'})
    restaurantUrlLogo: string

    @IsNotEmpty({message: 'Owner ID is empty'})
    @IsString({message: 'Owner ID must be a string'})
    ownerId: string

    constructor({restaurantName, restaurantNIT, restaurantAddress, restaurantPhoneNumber, restaurantUrlLogo, ownerId}:{restaurantName: string, restaurantNIT: number, restaurantAddress: string, restaurantPhoneNumber: string, restaurantUrlLogo: string, ownerId: string}){
        this.restaurantName = restaurantName,
        this.restaurantNIT = restaurantNIT,
        this.restaurantAddress = restaurantAddress,
        this.restaurantPhoneNumber = restaurantPhoneNumber,
        this.restaurantUrlLogo = restaurantUrlLogo,
        this.ownerId = ownerId
    }
}