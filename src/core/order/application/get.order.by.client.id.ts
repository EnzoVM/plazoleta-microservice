import OrderPersistanceRepository from "../domain/order.persistance.repository"

export default class GetOrderByClientId {
    private readonly orderPersistanceRepository: OrderPersistanceRepository

    constructor(orderPersistanceRepository: OrderPersistanceRepository) {
        this.orderPersistanceRepository = orderPersistanceRepository
    }

    async getOrder (clientId: string) {
        try {
            const orderFound = await this.orderPersistanceRepository.getOrderByClientId(clientId)
            return orderFound

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}