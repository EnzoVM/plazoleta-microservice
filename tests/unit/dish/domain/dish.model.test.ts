import Dish from "../../../../src/core/dish/domain/dish.model"
import DishUuidRepository from "../../../../src/core/dish/infraestructure/uuid/dish.uuid.repository"

const dishId: jest.Mocked<DishUuidRepository> = {
    generateDishId: jest.fn(() => 'fjr44jjjf4f-55-6443dd22s')
}

describe('Dish model', () => {

    test('Should create a new Dish Object', () => {
        const newDish = new Dish({
            dishId: dishId.generateDishId(),
            dishName: "Plato nuevo",
            categoryId: "2000000",
            dishDescription: "Esta es la descripcion del plato",
            dishPrice: 55,
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
            dishUrlImage: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
            dishActive: true
        })

        
        expect(newDish.dishId).toBe('fjr44jjjf4f-55-6443dd22s')
    })

})