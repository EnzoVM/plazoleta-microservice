import { Request, Response } from 'express'
import InsertDish from '../core/dish/application/insert.dish'
import UpdateDishById from '../core/dish/application/update.dish.by.id'
import UpdateStateDishById from '../core/dish/application/update.state.dish.by.id'
import ListDishesByRestaurantId from '../core/dish/application/list.dishes.by.restaurantId'
import GetDishById from '../core/dish/application/get.dish.by.id'

import DishPrismaRepository from '../core/dish/infraestructure/prisma/dish.prisma.repository'
import ImagenCloudinaryRepository from '../core/restaurant/infraestructure/cloudinary/image.cloudinary.repository'
import DishUuidRepository from '../core/dish/infraestructure/uuid/dish.uuid.repository'

const insertDish = new InsertDish(new DishPrismaRepository, new ImagenCloudinaryRepository, new DishUuidRepository)
const updateDishById = new UpdateDishById(new DishPrismaRepository)
const updateStateDishById = new UpdateStateDishById(new DishPrismaRepository)
const listDishesByRestaurantId = new ListDishesByRestaurantId(new DishPrismaRepository)
const getDishById = new GetDishById(new DishPrismaRepository)

export const createNewDish = async (req: Request, res: Response) => {
    const {dishName, categoryId, dishDescription, dishPrice, restaurantId, dishUrlImage} = req.body
    
    try {
        const newDishAdded = await insertDish.createDish(dishName, categoryId, dishDescription, dishPrice, restaurantId, dishUrlImage)
        console.log(newDishAdded);
        
        res.status(201).json({
            status: 'OK',
            message: 'The new dish has been created successfully',
            data: newDishAdded
        })
    } catch (error: any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

export const updateDish = async (req:Request, res: Response) => {
    const {dishId} = req.params
    const {dishDescription, dishPrice} = req.body
    
    try {
        const dishUpdated = await updateDishById.updateDish(dishId, dishDescription, dishPrice)
        
        res.status(200).json({
            status: 'OK',
            message: 'The dish has been updated successfully',
            data: dishUpdated
        })

    } catch (error:any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

export const updateStateDish = async (req: Request, res: Response) => {
    const { dishId } = req.params
    const { dishActive } = req.body

    try {
        const dishUpdated = await updateStateDishById.changeStateDish(dishId, dishActive)
        
        res.status(200).json({
            status: 'OK',
            message: 'The state of the dish has been updated',
            data: dishUpdated
        })
    } catch (error:any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

export const listDishesByRestaurant = async (req:Request, res: Response) => {
    const { page, limit, restaurantId } = req.params

    try {
        const listDishes = await listDishesByRestaurantId.listDishes(parseInt(page), parseInt(limit), restaurantId)

        res.status(200).json({
            status:'OK',
            message:'List of dishes per page, category and restaurant',
            data: listDishes
        })
    } catch (error:any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

export const getDishByDishId = async (req: Request, res: Response) => {
    const { dishId } = req.params

    try {
        const dishFound = await getDishById.getDishById(dishId)
        
        res.status(200).json({
            status:'OK',
            message:'The dish was found',
            data: dishFound
        })
    } catch (error:any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}
