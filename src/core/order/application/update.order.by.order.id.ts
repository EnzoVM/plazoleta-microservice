import OrderPersistanceRepository from "../domain/order.persistance.repository"

export default class UpdateOrderByOrderId {
    private readonly orderPersistanceRepository: OrderPersistanceRepository
    
    constructor(orderPersistanceRepository: OrderPersistanceRepository) {
        this.orderPersistanceRepository = orderPersistanceRepository
    }

    async updateOrder (orderId: string, orderState: string, chefId: string){
        try {
            if(!orderState){
                throw new Error('Order state is missing')
            }
    
            const orderFound = await this.orderPersistanceRepository.getOrderByOrderId(orderId)
            if(!orderFound){
                throw new Error('Order not found')
            }
            if(orderFound.orderState !== 'Pending'){
                throw new Error('The request must be in pending status to assign')
            }
            
            const orderUpdated = await this.orderPersistanceRepository.updateOrderByOrderId(orderId, orderState, chefId)
            return orderUpdated

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}