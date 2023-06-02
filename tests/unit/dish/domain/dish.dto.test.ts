import {validate} from "class-validator"
import DishDTO from "../../../../src/core/dish/domain/dish.dto"

jest.mock("class-validator")

describe('DishDTO model', () => {

    test('The data is entered correctly', async () => {
        (validate as jest.Mock).mockResolvedValueOnce([])

        const error = await validate(new DishDTO({
            dishName: "Plato nuevo",
            categoryId: "2000000",
            dishDescription: "Esta es la descripcion del plato",
            dishPrice: 55,
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
            dishUrlImage: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1"
        }))

        expect(error).toEqual([])
    })
})