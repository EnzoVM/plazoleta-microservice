import { v4 as uuid } from 'uuid'

export default class OrderDishesUuidRepository implements OrderDishesUuidRepository{

    generateOrderDishesId (): string {
        try {
            return uuid()

        } catch (error: any) {
            throw new Error(error.message)
        } 
    }
}