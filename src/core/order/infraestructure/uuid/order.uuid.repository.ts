import { v4 as uuid } from 'uuid'
import OrderIdGenerateRepository from '../../domain/order.id.generator.repository'

export default class OrderUuidRepository implements OrderIdGenerateRepository{

    generateOrderId (): string {
        try {
            return uuid()

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}