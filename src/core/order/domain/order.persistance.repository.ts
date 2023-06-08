import Order from "./order.model";

export default interface OrderPersistanceRepository {

    insertOrder: (order: Order) => Promise <Order>
    getOrderByClientId: (clientId: string) => Promise<Order[] | null>
    listAllOrdersByState: (orderState: string, restaurantId: string) => Promise<Order[] | null>
    updateOrderByOrderId: (orderId: string, orderState: string, chefId: string) => Promise <Order| null>
    getOrderByOrderId: (orderId: string) => Promise<Order | null>
    
}