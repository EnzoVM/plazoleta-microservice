import DishPrismaRepository from "../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository"
import UpdateDishById from "../../../../src/core/dish/application/update.dish.by.id"

jest.mock("../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository")

describe('Update Dish By Id', () => {

    test('Update dish successfully', async () => {
        const dishPrismaRepository = new DishPrismaRepository()

        const spyUpdateDish = jest.spyOn(dishPrismaRepository, 'updateDishById')

        spyUpdateDish.mockResolvedValue({
            dishId: "722a850c-6591-4a6f-b292-2bd07249af60",
            dishName: "Plato Arroz",
            categoryId: "2000001",
            dishDescription: "Esta es la descripción de un plato cambiada para pruebas unitarias",
            dishPrice: 200,
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685040514/btcjfh6bm3exf27lzkb6.jpg",
            dishActive: true
        })

        const updateDishById = new UpdateDishById(dishPrismaRepository)
        const dishUpdated = await updateDishById.updateDish("722a850c-6591-4a6f-b292-2bd07249af60", "Esta es la descripción de un plato cambiada para pruebas unitarias", 200)

        expect(dishUpdated.dishDescription).toStrictEqual("Esta es la descripción de un plato cambiada para pruebas unitarias")
        expect(dishUpdated.dishPrice).toBe(200)
    })


    test('When description is missing', async () => {
        const dishPrismaRepository = new DishPrismaRepository()

        const updateDishById = new UpdateDishById(dishPrismaRepository)

        //Description is missing
        //@ts-ignore
        await expect(updateDishById.updateDish("722a850c-6591-4a6f-b292-2bd07249af60", 200)).rejects.toBeInstanceOf(Error)
    })


    test('When price is missing', async () => {
        const dishPrismaRepository = new DishPrismaRepository()

        const updateDishById = new UpdateDishById(dishPrismaRepository)

        //Price is missing
        //@ts-ignore
        await expect(updateDishById.updateDish("722a850c-6591-4a6f-b292-2bd07249af60", "Esta es la descripción de un plato cambiada para pruebas unitarias")).rejects.toBeInstanceOf(Error)
    })


    test('when there is an error in update dish', async () => {
        const dishPrismaRepository = new DishPrismaRepository()

        const spyUpdateDish = jest.spyOn(dishPrismaRepository, 'updateDishById')

        spyUpdateDish.mockRejectedValue(new Error('ERROR IN UPDATE DISH'))

        const updateDishById = new UpdateDishById(dishPrismaRepository)

        await expect(updateDishById.updateDish("722a850c-6591-4a6f-b292-2bd07249af60", "Esta es la descripción de un plato cambiada para pruebas unitarias", 200)).rejects.toBeInstanceOf(Error)
    })


    test('when dish not found', async () => {
        const dishPrismaRepository = new DishPrismaRepository()

        const spyUpdateDish = jest.spyOn(dishPrismaRepository, 'updateDishById')

        spyUpdateDish.mockResolvedValue(null)

        const updateDishById = new UpdateDishById(dishPrismaRepository)

        await expect(updateDishById.updateDish("722a850c-6591-4a6f-b292-2bd07249af60", "Esta es la descripción de un plato cambiada para pruebas unitarias", 200)).rejects.toBeInstanceOf(Error)
    })
})
