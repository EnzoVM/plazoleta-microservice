import OrderPrismaRepository from "../../../../src/core/order/infraestructure/prisma/order.prisma.repository"
import OrderUuidRepository from "../../../../src/core/order/infraestructure/uuid/order.uuid.repository"
import OrderDishesPrismaRepository from "../../../../src/core/orderdishes/infraestructure/prisma/orderdishes.prisma.repository"
import OrderDishesUuidRepository from "../../../../src/core/orderdishes/infraestructure/uuid/orderdishes.uuid.repository" 
import DishPrismaRepository from "../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository"
import InsertOrder from "../../../../src/core/order/application/insert.order"

jest.mock("../../../../src/core/order/infraestructure/prisma/order.prisma.repository")
jest.mock("../../../../src/core/order/infraestructure/uuid/order.uuid.repository")
jest.mock("../../../../src/core/orderdishes/infraestructure/prisma/orderdishes.prisma.repository")
jest.mock("../../../../src/core/orderdishes/infraestructure/uuid/orderdishes.uuid.repository")
jest.mock("../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository")

describe('Insert a new order', () => {

    test('Insert a order successfully', async () => {
        const orderPrismaRepository = new OrderPrismaRepository()
        const orderUuidRepository = new OrderUuidRepository()
        const orderDishesPrismaRepository = new OrderDishesPrismaRepository()
        const orderDishesUuidRepository = new OrderDishesUuidRepository()
        const dishPrismaRepository = new DishPrismaRepository()

        const spyInsertOrder = jest.spyOn(orderPrismaRepository, 'insertOrder')
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByClientId')
        const spyGetDish = jest.spyOn(dishPrismaRepository, 'getDishById')
        const spyOrderId = jest.spyOn(orderUuidRepository, 'generateOrderId')
        const spyOrderDishesId = jest.spyOn(orderDishesUuidRepository, 'generateOrderDishesId')
        const spyInsertOrderDishes = jest.spyOn(orderDishesPrismaRepository, 'insertOrderDishes')


    })
})