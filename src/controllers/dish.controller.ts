import { Request, Response } from 'express'
import InsertDish from '../core/dish/application/insert.dish'
import DishPrismaRepository from '../core/dish/infraestructure/prisma/dish.prisma.repository'
import ImagenCloudinaryRepository from '../core/restaurant/infraestructure/cloudinary/image.cloudinary.repository'

const insertDish = new InsertDish(new DishPrismaRepository, new ImagenCloudinaryRepository)

export const addNewDish = async (req: Request, res: Response) => {
    const {dishName, categoryId, dishDescription, dishPrice, restaurantId, dishUrlImage} = req.body

    try {
        const newDishAdded = await insertDish.createNewDish(dishName, categoryId, dishDescription, dishPrice, restaurantId, dishUrlImage)
        
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