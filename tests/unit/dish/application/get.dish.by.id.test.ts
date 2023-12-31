import DishPrismaRepository from "../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository"
import GetDishById from "../../../../src/core/dish/application/get.dish.by.id"

jest.mock("../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository")

describe('Get Dish By Id', () => {

    let dishPrismaRepository
    let getDishById: GetDishById

    beforeEach(() => {
        dishPrismaRepository = new DishPrismaRepository()
        getDishById = new GetDishById(dishPrismaRepository)
    })
    
    afterEach(() => {
        jest.restoreAllMocks()
    })


    test('Get a dish successfully', async () => {
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
        
        const dishFound = await getDishById.getDishById('53f29b31-f86f-41d0-91a8-0e73fd82b2f6')

        expect(dishFound.dishId).toStrictEqual('53f29b31-f86f-41d0-91a8-0e73fd82b2f6')
        expect(dishFound.dishName).toBe('Plato nuevo mock')
    })


    test('When dish not found', async () => {
        const spy = jest.spyOn(dishPrismaRepository, 'getDishById')

        spy.mockResolvedValue(null)

        await expect(getDishById.getDishById('rttrrgrgr')).rejects.toBeInstanceOf(Error)
    })


    test('When there is an error with get dish by id', async () => {
        const spy = jest.spyOn(dishPrismaRepository, 'getDishById')

        spy.mockRejectedValue(new Error('ERROR IN GET DISH BY ID'))

        await expect(getDishById.getDishById('53f29b31-f86f-41d0-91a8-0e73fd82b2f6')).rejects.toBeInstanceOf(Error)
    })
})