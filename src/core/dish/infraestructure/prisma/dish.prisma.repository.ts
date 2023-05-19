import prisma from "../../../../connections/prisma.connection";
import Dish from "../../domain/dish.model";
import DishRepository from "../../domain/dish.repository";


export default class DishPrismaRepository implements DishRepository{
    
    async insertNewDish (dish: Dish) {
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
    }

}