
export default class Order {
    orderId: string
    clientId: string
    orderState: string
    restaurantId: string

    constructor({orderId, clientId, orderState, restaurantId}:{orderId: string, clientId: string, orderState: string, restaurantId: string}) {
        this.orderId = orderId,
        this.clientId = clientId,
        this.orderState = orderState
        this.restaurantId = restaurantId
    }
}