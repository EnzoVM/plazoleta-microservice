import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import GetRestaurantByRestaurantId from '../core/restaurant/application/get.restaurant.by.restaurant.id'
import RestaurantPrismaRepository from '../core/restaurant/infraestructure/prisma/restaurant.prisma.repository'
import GetDishById from '../core/dish/application/get.dish.by.id'
import DishPrismaRepository from '../core/dish/infraestructure/prisma/dish.prisma.repository'

const getRestaurantByRestaurantId = new GetRestaurantByRestaurantId(new RestaurantPrismaRepository)
const getDishById = new GetDishById(new DishPrismaRepository)

export const verifyOwnerRole = async (req: Request, res: Response, next: NextFunction) => {

    const { restaurantId } = req.body
    const { dishId } = req.params

    const tokenFound = req.header('Authorization')?.replace('Bearer ', '')
    
    if(!tokenFound) {
        return res.status(401).json({
            message: 'Unauthorized access. A valid token is required'
        })
    }

    try {
        const decodedToken: {userId:string, userRole: string} = jwt.verify(tokenFound, process.env.PRIVATE_KEY_TOKEN)
        
        if(decodedToken.userRole !== 'Owner') {
            return res.status(403).json({
                message: 'Access denied. Owner role is required'
            })
        }

        if(req.method === 'POST'){
            if(!restaurantId){
                return res.status(400).json({
                    message: 'Data is missing'
                })
            }

            const restaurantFound = await getRestaurantByRestaurantId.getRestaurantById(restaurantId)

            if(!restaurantFound){
                return res.status(404).json({
                    message: 'The restaurant id entered does not exist'
                })
            }

            if(decodedToken.userId !== restaurantFound.ownerId){
                return res.status(403).json({
                    message: 'Access denied. This restaurant is not assigned to this owner'
                })
            }
        }

        if(req.method === 'PUT') {
            const dishFound = await getDishById.getDishById(dishId)
            const restaurantFound = await getRestaurantByRestaurantId.getRestaurantById(dishFound.restaurantId)

            if(!restaurantFound){
                return res.status(404).json({
                    message: 'The restaurant id entered does not exist'
                })
            }

            if(decodedToken.userId !== restaurantFound.ownerId){
                return res.status(403).json({
                    message: 'Access denied. This restaurant is not assigned to this owner'
                })
            }
        }
  
        next()

    } catch (error:any) {
        
        return res.status(401).json({
            message: error.message
        })
    }
}