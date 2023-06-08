import { ValidationError, validate } from "class-validator"
import DishDTO from "../../../../src/core/dish/domain/dish.dto"
import { dishDtoDataMissing, dishDtoDataValidate } from "../../../helpers/dish/dish.dto.helper"

describe('DishDTO model', () => {

    test('The data is entered correctly', async () => {

        const errorDataDish = await validate(new DishDTO({
            dishName: "Plato nuevo",
            categoryId: "2000000",
            dishDescription: "Esta es la descripcion del plato",
            dishPrice: 55,
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
            dishUrlImage: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1"
        }))

        expect(errorDataDish).toEqual([])
    })


    test('When some or all parameters are missing', async () => {

        for (const data of dishDtoDataMissing){
            //@ts-ignore
            const errorDataDish = await validate(new DishDTO(data))

            expect(errorDataDish[0]).toBeInstanceOf(ValidationError)
        }
    })


    test('When data validate are wrong', async () => {

        for (const data of dishDtoDataValidate){
            //@ts-ignore
            const errorDataDish = await validate(new DishDTO(data))

            expect(errorDataDish[0]).toBeInstanceOf(ValidationError)
        }
    })
})