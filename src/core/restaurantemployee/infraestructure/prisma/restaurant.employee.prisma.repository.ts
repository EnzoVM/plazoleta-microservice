import prisma from "../../../../connections/prisma.connection"
import RestaurantEmployee from "../../domain/restaurant.employee.model"
import RestaurantEmployeePersistanceRepository from "../../domain/restaurant.employee.persistance.repository"

export default class RestaurantEmployeePrismaRepository implements RestaurantEmployeePersistanceRepository{
    
    async insertEmployeeToRestaurant (restaurantEmployee: RestaurantEmployee): Promise<RestaurantEmployee> {
        try {
            const restaurantEmployeeSaved = await prisma.restaurantEmployee.create({
                data: {
                    restaurantEmployeeId: restaurantEmployee.restaurantEmployeeId,
                    restaurantId: restaurantEmployee.restaurantId,
                    chefId: restaurantEmployee.chefId
                }
            })
    
            return restaurantEmployeeSaved

        } catch (error: any) {
            throw new Error('ERROR IN INSERT EMPLOYEE TO RESTAURANT')
        }
    }

    async getRestaurantEmployeeById (chefId: string): Promise<RestaurantEmployee | null> {
        try {
            const restaurantEmployeeFound = await prisma.restaurantEmployee.findUnique({
                where: {
                    chefId: chefId
                }
            })
            
            return restaurantEmployeeFound

        } catch (error:any) {
            throw new Error('ERROR IN GET RESTAURANT EMPLOYEE BY ID')
        }
    }
}