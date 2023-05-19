import prisma from "../../../../connections/prisma.connection";
import Restaurant from "../../domain/restaurant.model";
import RestaurantRepository from "../../domain/restaurant.repository";


export default class RestaurantPrismaRepository implements RestaurantRepository{
    
    async insertNewRestaurant (restaurant: Restaurant) {
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
    }
}