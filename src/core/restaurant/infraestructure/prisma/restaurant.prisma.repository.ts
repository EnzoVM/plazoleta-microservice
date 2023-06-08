import prisma from "../../../../connections/prisma.connection";
import Restaurant from "../../domain/restaurant.model";
import RestaurantRepository from "../../domain/restaurant.persistance.repository";

export default class RestaurantPrismaRepository implements RestaurantRepository{
    
    async insertRestaurant (restaurant: Restaurant): Promise<Restaurant> {
        try {
            const restaurantSaved = await prisma.restaurant.create ({
                data: {
                    restaurantId: restaurant.restaurantId,
                    restaurantName: restaurant.restaurantName,
                    restaurantNIT: restaurant.restaurantNIT,
                    restaurantAddress: restaurant.restaurantAddress,
                    restaurantPhoneNumber: restaurant.restaurantPhoneNumber,
                    restaurantUrlLogo: restaurant.restaurantUrlLogo,
                    ownerId: restaurant.ownerId
                }
            })
    
            return restaurantSaved

        } catch (error: any) {
            throw new Error('ERROR IN CREATE RESTAURANT')
        }
    }

    async getRestaurantById (restaurantId: string): Promise<Restaurant | null> {
        try {
            const restaurantFound = await prisma.restaurant.findUnique({
                where: {
                    restaurantId
                }
            })
    
            return restaurantFound

        } catch (error: any) {
            throw new Error('ERROR IN GET RESTAURANT BY ID')
        }
    }

    async listAllRestaurants (): Promise<Restaurant[]> {
        try {
            const restaurantList = await prisma.restaurant.findMany()

            return restaurantList

        } catch (error) {
            throw new Error('ERROR IN LIST ALL RESTAURANTS')
        }
    }
}