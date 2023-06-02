import RestaurantIdGeneratorRepository from "../../domain/restaurant.id.generator.repository";
import { v4 as uuid } from 'uuid'

export default class RestaurantUuidRepository implements RestaurantIdGeneratorRepository{
    
    generateRestaurantId (): string {
        try {
            return uuid()
            
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}