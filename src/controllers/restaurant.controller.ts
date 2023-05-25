import { Request, Response } from "express"
import InsertRestaurant  from "../core/restaurant/application/insert.restaurant"
import RestaurantPrismaRepository from "../core/restaurant/infraestructure/prisma/restaurant.prisma.repository"
import ImagenCloudinaryRepository from "../core/restaurant/infraestructure/cloudinary/image.cloudinary.repository"
import InsertEmployeeToRestaurant from "../core/restaurant/application/insert.employee.to.restaurant"
import GetRestaurantById from "../core/restaurant/application/get.restaurant.by.id"

const insertRestaurant = new InsertRestaurant(new RestaurantPrismaRepository, new ImagenCloudinaryRepository)
const insertEmployeeToRestaurant = new InsertEmployeeToRestaurant(new RestaurantPrismaRepository)
const getRestaurantByIdentification = new GetRestaurantById(new RestaurantPrismaRepository)

export const createNewRestaurant = async (req: Request, res: Response) => {
    const {restaurantName, restaurantNIT, restaurantAddress, restaurantPhoneNumber, restaurantUrlLogo, ownerId} = req.body
    
    try {
        const newRestaurantAdded = await insertRestaurant.createRestaurant(restaurantName, restaurantNIT, restaurantAddress, restaurantPhoneNumber, restaurantUrlLogo, ownerId)

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

export const createEmployeeToRestaurant = async (req: Request, res: Response) => {
    const {restaurantId, chefId } = req.body

    try {
        const newRestaurantEmployeeAdded = await insertEmployeeToRestaurant.insertEmployeeToRestaurant(restaurantId, chefId)

        res.status(201).json({
            status: 'OK',
            message: 'Data is registered',
            data: newRestaurantEmployeeAdded
        })

    } catch (error:any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

export const getRestaurantById = async (req: Request, res: Response) => {
    const { restaurantId } = req.params

    try {
        const restaurantFound = await getRestaurantByIdentification.getRestaurantById(restaurantId)

        res.status(200).json({
            status: 'OK',
            message: 'The restaurant has been found',
            data: restaurantFound
        })

    } catch (error:any) {
        
        res.status(400).json({
            status: 'Fail',
            message: 'The restaurant has not been found'
        })
    }
}