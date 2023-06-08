import OrderDishes from "./orderdishes.model"

export default interface OrderDishesPersistanceRepository {

    insertOrderDishes: (orderDishes: OrderDishes) => Promise <OrderDishes>
}