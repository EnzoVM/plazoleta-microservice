import DishPrismaRepository from "../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository"
import UpdateStateDishById from "../../../../src/core/dish/application/update.state.dish.by.id"

jest.mock("../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository")

describe('Update State Dish By Id', () => {

    test('Update state dish successfully', async () => {
        const dishPrismaRepository = new DishPrismaRepository()

        const spyUpdateStateDish = jest.spyOn(dishPrismaRepository, 'updateStateDishById')

        spyUpdateStateDish.mockResolvedValue({
            dishId: "722a850c-6591-4a6f-b292-2bd07249af60",
            dishName: "Plato nuevo rrr",
            categoryId: "2000001",
            dishDescription: "Esta es la descripción de un plato cambiada",
            dishPrice: 5,
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685040514/btcjfh6bm3exf27lzkb6.jpg",
            dishActive: false
        })

        const updateStateDishById = new UpdateStateDishById(dishPrismaRepository)
        const stateDishUpdated = await updateStateDishById.changeStateDish("722a850c-6591-4a6f-b292-2bd07249af60", false)
        console.log(stateDishUpdated);
        

        expect(stateDishUpdated.dishId).toBe("722a850c-6591-4a6f-b292-2bd07249af60")
        expect(stateDishUpdated.dishActive).toBe(false)
    })
})