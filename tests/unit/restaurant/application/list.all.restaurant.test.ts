import RestaurantPrismaRepository from "../../../../src/core/restaurant/infraestructure/prisma/restaurant.prisma.repository"
import ListAllRestaurant from "../../../../src/core/restaurant/application/list.all.restaurant"
import { arrayOfRestaurant } from "../../../helpers/restaurant/list.all.restaurant.helper"

jest.mock("../../../../src/core/restaurant/infraestructure/prisma/restaurant.prisma.repository")

describe('List all restaurant', () => {

    test('List all restaurant successfully', async () => {
        const restaurantPrismaRepository = new RestaurantPrismaRepository()

        const spyListRestaurant = jest.spyOn(restaurantPrismaRepository, 'listAllRestaurants')

        spyListRestaurant.mockResolvedValue(arrayOfRestaurant)

        const listAllRestaurant = new ListAllRestaurant(restaurantPrismaRepository)
        const restaurantList = await listAllRestaurant.listRestaurants(1, 3)

        expect(restaurantList).toHaveLength(3)
    })
})