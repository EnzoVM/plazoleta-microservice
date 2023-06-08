
export default class OrderDishes {
    orderDishesId: string
    orderId: string
    dishId: string
    cantidad: number

    constructor({orderDishesId, orderId, dishId, cantidad}:{orderDishesId: string, orderId: string, dishId: string, cantidad: number}) {
        this.orderDishesId = orderDishesId,
        this.orderId = orderId,
        this.dishId = dishId,
        this.cantidad = cantidad
    }
}