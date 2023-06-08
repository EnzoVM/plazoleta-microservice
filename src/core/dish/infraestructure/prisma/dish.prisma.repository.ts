import prisma from "../../../../connections/prisma.connection"
import Dish from "../../domain/dish.model"
import DishPersistanceRepository from "../../domain/dish.persistance.repository"

export default class DishPrismaRepository implements DishPersistanceRepository{
    
    async insertDish (dish: Dish): Promise<Dish> {
        try {
            const dishSaved = await prisma.dishes.create({
                data: {
                    dishId: dish.dishId,
                    dishName: dish.dishName,
                    categoryId: dish.categoryId,
                    dishDescription: dish.dishDescription,
                    dishPrice: dish.dishPrice,
                    restaurantId: dish.restaurantId,
                    dishUrlImage: dish.dishUrlImage,
                    dishActive: dish.dishActive
                }
            })
    
            return dishSaved

        } catch (error:any) {
            throw new Error('ERROR IN CREATE DISH')
        }
    }

    async updateDishById (dishId: string, dishDescription: string, dishPrice: number): Promise<Dish | null> {
        try {
            const dishUpdated = await prisma.dishes.update({
                where: {
                    dishId
                },
                data: {
                    dishDescription,
                    dishPrice
                }
            })
    
            return dishUpdated

        } catch (error:any) {
            throw new Error('ERROR IN UPDATE DISH')
        }
    }

    async getDishById (dishId: string): Promise<Dish | null> {
        try {
            const dishFound = await prisma.dishes.findUnique({
                where:{
                    dishId
                }
            })
            
            return dishFound

        } catch (error:any) {
            throw new Error('ERROR IN GET DISH BY ID')
        } 
    }

    async updateStateDishById (dishId: string, dishActive: boolean): Promise<Dish | null> {
        try {
            const dishUpdate = await prisma.dishes.update({
                where: {
                    dishId
                },
                data: {
                    dishActive
                }
            })
            
            return dishUpdate

        } catch (error:any) {
            throw new Error('ERROR IN UPDATE STATE OF DISH');
        }
    }

    async listDishesByRestaurantId (restaurantId: string): Promise<Dish[] | null> {
        try {
            const listDishes= await prisma.dishes.findMany({
                where:{
                    restaurantId
                }
            })

            return listDishes

        } catch (error:any) {
            throw new Error('ERROR IN LIST DISHES BY RESTAURANT')
        }
    }
}