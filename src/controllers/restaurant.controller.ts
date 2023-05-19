import { Request, Response } from "express"
import InsertRestaurant  from "../core/restaurant/application/insert.restaurant"
import RestaurantPrismaRepository from "../core/restaurant/infraestructure/prisma/restaurant.prisma.repository"
import ImagenCloudinaryRepository from "../core/restaurant/infraestructure/cloudinary/image.cloudinary.repository"

const insertRestaurant = new InsertRestaurant(new RestaurantPrismaRepository, new ImagenCloudinaryRepository)

export const addNewRestaurant = async (req: Request, res: Response) => {
    const {restaurantName, restaurantNIT, restaurantAddress, restaurantPhoneNumber, restaurantUrlLogo, ownerId} = req.body
    
    try {
        const newRestaurantAdded = await insertRestaurant.createNewRestaurant(restaurantName, restaurantNIT, restaurantAddress, restaurantPhoneNumber, restaurantUrlLogo, ownerId)

        res.status(201).json({
            status: 'OK',
            message: 'The new restaurant has been created successfully',
            data: newRestaurantAdded
        })

    } catch (error:any){
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}