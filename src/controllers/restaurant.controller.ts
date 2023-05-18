import { Request, Response } from "express"
import InsertRestaurant  from "../core/restaurant/application/insert.restaurant"
import RestaurantPrismaRepository from "../core/restaurant/infraestructure/restaurant.prisma.repository"

const insertRestaurant = new InsertRestaurant(new RestaurantPrismaRepository)

export const addNewRestaurant = async (req: Request, res: Response) => {
    const {restaurantName, restaurantNIT, restaurantAddress, restaurantPhoneNumber, restaurantUrlLogo, ownerId} = req.body
    
    try {
        const newRestaurantAdded = await insertRestaurant.createNewRestaurant(restaurantName, restaurantNIT, restaurantAddress, restaurantPhoneNumber, restaurantUrlLogo, ownerId)

        res.status(201).json({
            status: 'OK',
            message: 'The new restaurant has been inserted successfully',
            data: newRestaurantAdded
        })

    } catch (error:any){
        console.log(error);
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}