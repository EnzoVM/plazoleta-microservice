import Order from "../../../src/core/order/domain/order.model"


export const arrayDishes = [{
    dishId: "53013158-5eb0-4b00-9fe3-d16434ca7382",
    cantidad: 10
},
{
    dishId: "5da11ad9-9a2f-4cc4-9ae5-8b4654ed8866",
    cantidad: 5
},
{
    dishId: "863ced87-5544-4f58-abb3-4c86541c5994",
    cantidad: 2
}]


export const arrayOrdersGood: Order[] = [
    { orderId: "orderId1", clientId: "clientId", orderState: "Delivery", restaurantId: "restaurantId" },
    { orderId: "orderId2", clientId: "clientId", orderState: "Delivery", restaurantId: "restaurantId" },
    { orderId: "orderId3", clientId: "clientId", orderState: "Delivery", restaurantId: "restaurantId" }
]


export const arrayOrdersBad: Order[] = [
    { orderId: "orderId1", clientId: "clientId", orderState: "Pending", restaurantId: "restaurantId" },
    { orderId: "orderId2", clientId: "clientId", orderState: "In preparation", restaurantId: "restaurantId" },
    { orderId: "orderId3", clientId: "clientId", orderState: "Ready", restaurantId: "restaurantId" }
]