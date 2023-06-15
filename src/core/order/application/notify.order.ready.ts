import OrderPersistanceRepository from "../domain/order.persistance.repository"
import OrderServiceRepository from "../domain/order.service.repository"
import { PinValidator } from "../domain/order.pin.validator"

export default class NotifyOrderReady {
    private readonly orderPersistanceRepository: OrderPersistanceRepository
    private readonly orderServiceRepository: OrderServiceRepository

    constructor(orderPersistanceRepository: OrderPersistanceRepository, orderServiceRepository: OrderServiceRepository) {
        this.orderPersistanceRepository = orderPersistanceRepository
        this.orderServiceRepository = orderServiceRepository
    }

    async notifyOrder (orderId: string, body: string, to: string) {
        try {
            const orderFound = await this.orderPersistanceRepository.getOrderByOrderId(orderId)              
            if(!orderFound){
                throw new Error('Order not found')
            }      
            if(orderFound.orderState !== 'In preparation'){
                throw new Error('The request must be in preparation status')
            }

            const orderReady = await this.orderPersistanceRepository.updateOrderById(orderId, 'Ready')
            if(!orderReady){
                throw new Error('Order can not be ready')
            }

            const pinValidator = new PinValidator()
            pinValidator.sendPin(body)

            const message = await this.orderServiceRepository.sendMessage(body, to)
            
            return { orderReady, message }

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}