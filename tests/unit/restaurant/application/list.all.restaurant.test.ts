import RestaurantPrismaRepository from "../../../../src/core/restaurant/infraestructure/prisma/restaurant.prisma.repository"
import ListAllRestaurant from "../../../../src/core/restaurant/application/list.all.restaurant"
import { arrayOfRestaurant } from "../../../helpers/restaurant/list.all.restaurant.helper"

jest.mock("../../../../src/core/restaurant/infraestructure/prisma/restaurant.prisma.repository")

describe('List all restaurant', () => {

    let restaurantPrismaRepository
    let listAllRestaurant: ListAllRestaurant

    beforeEach(() => {
        restaurantPrismaRepository = new RestaurantPrismaRepository()
        listAllRestaurant = new ListAllRestaurant(restaurantPrismaRepository)
    })
    
    afterEach(() => {
        jest.restoreAllMocks()
    })


    test('List all restaurant successfully', async () => {
        const spyListRestaurant = jest.spyOn(restaurantPrismaRepository, 'listAllRestaurants')

        spyListRestaurant.mockResolvedValue(arrayOfRestaurant)

        const restaurantList = await listAllRestaurant.listRestaurants(1, 3)

        expect(restaurantList).toHaveLength(3)
    })
})