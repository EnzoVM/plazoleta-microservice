import { Request, Response } from "express"
import InsertRestaurant  from "../core/restaurant/application/insert.restaurant"
import GetRestaurantByRestaurantId from "../core/restaurant/application/get.restaurant.by.restaurant.id"
import ListAllRestaurant from "../core/restaurant/application/list.all.restaurant"

import RestaurantPrismaRepository from "../core/restaurant/infraestructure/prisma/restaurant.prisma.repository"
import RestaurantImagenCloudinaryRepository from "../core/restaurant/infraestructure/cloudinary/restaurant.image.cloudinary.repository"
import RestaurantUuidRepository from "../core/restaurant/infraestructure/uuid/restaurant.uuid.repository"
import UserServiceRepository from "../core/restaurant/infraestructure/services/user.service.repository"

const insertRestaurant = new InsertRestaurant(new RestaurantPrismaRepository, new RestaurantImagenCloudinaryRepository, new RestaurantUuidRepository, new UserServiceRepository)
const getRestaurantByRestaurantId = new GetRestaurantByRestaurantId(new RestaurantPrismaRepository)
const listAllRestaurants = new ListAllRestaurant(new RestaurantPrismaRepository)

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

export const getRestaurantById = async (req: Request, res: Response) => {
    const { restaurantId } = req.params

    try {
        const restaurantFound = await getRestaurantByRestaurantId.getRestaurantById(restaurantId)

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

export const listRestaurant = async (req: Request, res: Response) => {
    const { page, limit } = req.params

    try {
        const listRestaurants = await listAllRestaurants.listRestaurants(parseInt(page), parseInt(limit))

        res.status(200).json({
            status: 'OK',
            message: 'List of all restaurants per page',
            data: listRestaurants
        })
    } catch (error:any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}