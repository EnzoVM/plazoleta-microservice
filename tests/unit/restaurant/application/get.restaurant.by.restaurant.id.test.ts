import RestaurantPrismaRepository from "../../../../src/core/restaurant/infraestructure/prisma/restaurant.prisma.repository"
import GetRestaurantByRestaurantId from "../../../../src/core/restaurant/application/get.restaurant.by.restaurant.id"

jest.mock("../../../../src/core/restaurant/infraestructure/prisma/restaurant.prisma.repository")

describe('Get restaurant by id', () => {

    test('Get a dish successfully', async () => {
        const restaurantPrismaRepository = new RestaurantPrismaRepository()
        
        const spyGetRestaurant = jest.spyOn(restaurantPrismaRepository, 'getRestaurantById')

        spyGetRestaurant.mockResolvedValue({
            restaurantId: "46326203-ef31-45b3-86ca-02110f9736a7",
            restaurantName: "RestaurantPrueba",
            restaurantNIT: 987457634,
            restaurantAddress: "Av. Prueba 356",
            restaurantPhoneNumber: "345675648954",
            restaurantUrlLogo: "urlejemplo",
            ownerId: "2683751010300631123"
        })

        const getRestaurantByRestaurantId = new GetRestaurantByRestaurantId(restaurantPrismaRepository)
        const restaurantFound = await getRestaurantByRestaurantId.getRestaurantById('46326203-ef31-45b3-86ca-02110f9736a7')

        expect(restaurantFound.restaurantId).toStrictEqual('46326203-ef31-45b3-86ca-02110f9736a7')
    })


    test('When restaurant not found', async () => {
        const restaurantPrismaRepository = new RestaurantPrismaRepository()
        
        const spyGetRestaurant = jest.spyOn(restaurantPrismaRepository, 'getRestaurantById')

        spyGetRestaurant.mockResolvedValue(null)

        const getRestaurantByRestaurantId = new GetRestaurantByRestaurantId(restaurantPrismaRepository)

        await expect(getRestaurantByRestaurantId.getRestaurantById('46326203-ef31-45b3-86ca-02110f9736a7')).rejects.toBeInstanceOf(Error)
    })


    test('When there is an error with get restaurant', async () => {
        const restaurantPrismaRepository = new RestaurantPrismaRepository()
        
        const spyGetRestaurant = jest.spyOn(restaurantPrismaRepository, 'getRestaurantById')

        spyGetRestaurant.mockRejectedValue(new Error('ERROR'))

        const getRestaurantByRestaurantId = new GetRestaurantByRestaurantId(restaurantPrismaRepository)

        await expect(getRestaurantByRestaurantId.getRestaurantById('46326203-ef31-45b3-86ca-02110f9736a7')).rejects.toBeInstanceOf(Error)
    })
})