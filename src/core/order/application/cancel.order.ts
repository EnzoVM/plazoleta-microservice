import OrderPersistanceRepository from "../domain/order.persistance.repository"

export default class CancelOrder {
    private readonly orderPersistanceRepository: OrderPersistanceRepository

    constructor(orderPersistanceRepository: OrderPersistanceRepository) {
        this.orderPersistanceRepository = orderPersistanceRepository
    }

    async cancelOrder (orderId: string, clientId: string) {
        try {
            const orderFound = await this.orderPersistanceRepository.getOrderByOrderId(orderId)
            if(!orderFound){
                throw new Error('Order not found')
            }
            if(orderFound.clientId !== clientId){
                throw new Error('The order does not belong to the customer')
            }   
            if(orderFound.orderState !== 'Pending'){
                throw new Error('Sorry, your order is already being prepared and cannot be cancelled')
            }

            const orderCanceled = await this.orderPersistanceRepository.updateOrderById(orderId, 'Cancelled')
            if(!orderCanceled){
                throw new Error('Order can not be cancelled')
            }
            
            return orderCanceled

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}