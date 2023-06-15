import OrderPersistanceRepository from "../domain/order.persistance.repository"

export default class AssignOrderToEmployee {
    private readonly orderPersistanceRepository: OrderPersistanceRepository
    
    constructor(orderPersistanceRepository: OrderPersistanceRepository) {
        this.orderPersistanceRepository = orderPersistanceRepository
    }

    async assignOrder (orderId: string, chefId: string){
        try {
            const orderFound = await this.orderPersistanceRepository.getOrderByOrderId(orderId)          
            if(!orderFound){
                throw new Error('Order not found')
            }
            if(orderFound.orderState !== 'Pending'){
                throw new Error('The request must be in pending status to assign')
            }
            
            const orderAssigned = await this.orderPersistanceRepository.updateOrderByOrderId(orderId, 'In preparation', chefId)
            if(!orderAssigned){
                throw new Error('Order can not assign')
            }
            
            return orderAssigned

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}