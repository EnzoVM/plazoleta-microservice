import OrderPersistanceRepository from "../domain/order.persistance.repository"
import { PinValidator } from "../domain/order.pin.validator"

export default class DeliverOrder {
    private readonly orderPersistanceRepository: OrderPersistanceRepository

    constructor(orderPersistanceRepository: OrderPersistanceRepository) {
        this.orderPersistanceRepository = orderPersistanceRepository
    }

    async deliverOrder (orderId: string, pin: string) {
        try {
            const orderFound = await this.orderPersistanceRepository.getOrderByOrderId(orderId)              
            if(!orderFound){
                throw new Error('Order not found')
            }      
            if(orderFound.orderState !== 'Ready'){
                throw new Error('The request must be in ready status')
            }

            const pinValidator = new PinValidator()
            const boolean = pinValidator.validatePin(pin)
            if(!boolean){
                throw new Error('The PIN is incorrect')
            }

            const orderDelivered = await this.orderPersistanceRepository.updateOrderById(orderId, 'Delivered')
            if(!orderDelivered){
                throw new Error('Order can not be Delivered')
            }

            return orderDelivered

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}