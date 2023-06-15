import { v4 as uuid } from 'uuid'
import RestaurantEmployeeIdGeneratorRepository from '../../domain/restaurant.employee.id.generator.repository'

export default class RestaurantEmployeeUuidRepository implements RestaurantEmployeeIdGeneratorRepository{

    generateRestaurantEmployeeId (): string {
        try {
            return uuid()
            
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}