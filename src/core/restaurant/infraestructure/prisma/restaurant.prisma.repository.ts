import prisma from "../../../../connections/prisma.connection";
import RestaurantEmployee from "../../domain/restaurant.employee.model";
import Restaurant from "../../domain/restaurant.model";
import RestaurantRepository from "../../domain/restaurant.repository";


export default class RestaurantPrismaRepository implements RestaurantRepository{
    
    async insertRestaurant (restaurant: Restaurant) {
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

    async getRestaurantById (restaurantId: string) {
        const restaurantFound = await prisma.restaurant.findUnique({
            where: {
                restaurantId
            }
        })

        if(!restaurantFound) {return null}
        return restaurantFound
    }

    async insertRestaurantEmployee (restaurantEmployee: RestaurantEmployee) {
        const restaurantEmployeeSaved = await prisma.restaurantEmployee.create({
            data: {
                restaurantEmployeeId: restaurantEmployee.restaurantEmployeeId,
                restaurantId: restaurantEmployee.restaurantId,
                chefId: restaurantEmployee.chefId
            }
        })

        return restaurantEmployeeSaved
    }
}