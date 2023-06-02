import Order from "./order.model";

export default interface OrderPersistanceRepository {

    insertOrder: (order: Order) => Promise <Order>
    getOrderByClientId: (clientId: string) => Promise<Order[]>
    listAllOrdersByState: (orderState: string, restaurantId: string) => Promise<Order[]>
    updateOrderByOrderId: (orderId: string, orderState: string, chefId: string) => Promise <Order>
    getOrderByOrderId: (orderId: string) => Promise<Order | null>
    
}