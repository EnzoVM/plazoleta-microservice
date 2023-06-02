import DishPrismaRepository from "../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository"
import GetDishById from "../../../../src/core/dish/application/get.dish.by.id"

jest.mock("../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository")

describe('Get Dish By Id', () => {

    test('Get a dish successfully', async () => {
        const dishPrismaRepository = new DishPrismaRepository()

        const spyGetDish = jest.spyOn(dishPrismaRepository, 'getDishById')
        
        spyGetDish.mockResolvedValueOnce({
            dishId: '53f29b31-f86f-41d0-91a8-0e73fd82b2f6',      
            dishName: 'Plato nuevo mock',
            categoryId: '2000001',
            dishDescription: 'Este es un plato de prueba',       
            dishPrice: 20,
            restaurantId: '1a2a730e-ee3c-4d4f-9f19-2cab34838950',
            dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685488920/eiokfpirsg3rpw2x2ekz.jpg',
            dishActive: true
        })
        
        const getDishById = new GetDishById(dishPrismaRepository)
        const dishFound = await getDishById.getDishById('53f29b31-f86f-41d0-91a8-0e73fd82b2f6')

        expect(dishFound.dishName).toBe('Plato nuevo mock')
    })

    test('Show a throw new error when send an id that not exists', async () => {
        const dishPrismaRepository = new DishPrismaRepository()

        const spy = jest.spyOn(dishPrismaRepository, 'getDishById')

        spy.mockResolvedValueOnce(null)

        const getDishById = new GetDishById(dishPrismaRepository)
        await expect(getDishById.getDishById('rttrrgrgr')).rejects.toBeInstanceOf(Error)
    })

})