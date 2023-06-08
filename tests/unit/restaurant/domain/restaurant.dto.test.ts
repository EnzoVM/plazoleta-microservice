import { ValidationError, validate } from "class-validator"
import RestaurantDTO from "../../../../src/core/restaurant/domain/restaurant.dto"
import { restaurantDtoDataMissing, restaurantDtoDataValidate } from "../../../helpers/restaurant/restaurant.dto.helper"

describe('RestaurantDTO model', () => {

    test('The data is entered correctly', async () => {

        const errorDataRestaurant = await validate(new RestaurantDTO({
            restaurantName: "abc",
            restaurantNIT: 987457634,
            restaurantAddress: "Av. Prueba 356",
            restaurantPhoneNumber: "+734526754234",
            restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
            ownerId: "7293688879321855281"
        }))

        expect(errorDataRestaurant).toEqual([])
    })


    test('When some or all parameters are missing', async () => {

        for(const data of restaurantDtoDataMissing){
            //@ts-ignore
            const errorDataRestaurant = await validate(new RestaurantDTO(data))

            expect(errorDataRestaurant[0]).toBeInstanceOf(ValidationError)
        }
    })


    test('When data validate are wrong', async () => {

        for(const data of restaurantDtoDataValidate){
            //@ts-ignore
            const errorDataRestaurant = await validate(new RestaurantDTO(data))

            expect(errorDataRestaurant[0]).toBeInstanceOf(ValidationError)
        }
    })
})