import OrderPersistanceRepository from "../domain/order.persistance.repository"

export default class GetOrderByOrderId {
    private readonly orderPersistanceRepository: OrderPersistanceRepository

    constructor(orderPersistanceRepository: OrderPersistanceRepository) {
        this.orderPersistanceRepository = orderPersistanceRepository
    }

    async getOrder (orderId: string){
        try {
            const orderFound = await this.orderPersistanceRepository.getOrderByOrderId(orderId)

            if(!orderFound) {
                throw new Error('Order not found')
            }

            return orderFound

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}