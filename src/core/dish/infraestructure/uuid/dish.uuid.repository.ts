import { v4 as uuid } from 'uuid'
import DishIdGeneratorRepository from "../../domain/dish.id.generator.repository";

export default class DishUuidRepository implements DishIdGeneratorRepository{

    generateDishId (): string {
        try {
            return uuid()
            
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}