import OrderPrismaRepository from "../../../../src/core/order/infraestructure/prisma/order.prisma.repository"
import OrderUuidRepository from "../../../../src/core/order/infraestructure/uuid/order.uuid.repository"
import OrderDishesPrismaRepository from "../../../../src/core/orderdishes/infraestructure/prisma/orderdishes.prisma.repository"
import OrderDishesUuidRepository from "../../../../src/core/orderdishes/infraestructure/uuid/orderdishes.uuid.repository" 
import DishPrismaRepository from "../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository"
import InsertOrder from "../../../../src/core/order/application/insert.order"
import Order from "../../../../src/core/order/domain/order.model"
import { arrayDishes, arrayOrdersGood, arrayOrdersBad } from "../../../helpers/order/insert.order.helper"

jest.mock("../../../../src/core/order/infraestructure/prisma/order.prisma.repository")
jest.mock("../../../../src/core/order/infraestructure/uuid/order.uuid.repository")
jest.mock("../../../../src/core/orderdishes/infraestructure/prisma/orderdishes.prisma.repository")
jest.mock("../../../../src/core/orderdishes/infraestructure/uuid/orderdishes.uuid.repository")
jest.mock("../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository")

describe('Insert a new order', () => {

    let orderPrismaRepository
    let orderUuidRepository
    let orderDishesPrismaRepository
    let orderDishesUuidRepository
    let dishPrismaRepository
    let insertOrder: InsertOrder

    beforeEach(() => {
        orderPrismaRepository = new OrderPrismaRepository()
        orderUuidRepository = new OrderUuidRepository()
        orderDishesPrismaRepository = new OrderDishesPrismaRepository()
        orderDishesUuidRepository = new OrderDishesUuidRepository()
        dishPrismaRepository = new DishPrismaRepository()
        insertOrder = new InsertOrder(
            orderPrismaRepository,
            orderUuidRepository,
            orderDishesPrismaRepository,
            orderDishesUuidRepository,
            dishPrismaRepository
        )
    })
    
    afterEach(() => {
        jest.restoreAllMocks()
    })


    test("Should throw an error when there are no orders assigned to the client", async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByClientId')
        spyGetOrder.mockResolvedValue(null)

        await expect(insertOrder.create("3435255435223", "4g4g4g4-646-4f4f44g", arrayDishes)).rejects.toThrowError("There are no orders assigned to this client")
        expect(spyGetOrder).toHaveBeenCalledWith("3435255435223")
    });


    test("Should throw an error when the client has an order with pending status", async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByClientId')
        spyGetOrder.mockResolvedValue(arrayOrdersBad)

        await expect(insertOrder.create("3435255435223", "4g4g4g4-646-4f4f44g", arrayDishes)).rejects.toThrowError("You have an order with pending status")
    })


    test("Should throw an error when there is a problem in prisma get order by id", async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByClientId')
        spyGetOrder.mockRejectedValue(new Error('ERROR IN ORDERS'))

        await expect(insertOrder.create("3435255435223", "4g4g4g4-646-4f4f44g", arrayDishes)).rejects.toThrowError("ERROR IN ORDERS")
    })


    test("Should throw an error when dish not found", async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByClientId')
        spyGetOrder.mockResolvedValue(arrayOrdersGood)
        
        const spyGetDish = jest.spyOn(dishPrismaRepository, 'getDishById')
        spyGetDish.mockResolvedValue(null)

        await expect(insertOrder.create("3435255435223", "4g4g4g4-646-4f4f44g", arrayDishes)).rejects.toThrowError("Dish not found")
    })


    test("Should throw an error when The dishes do not belong to the same restaurant", async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByClientId')
        spyGetOrder.mockResolvedValue(arrayOrdersGood)
        
        const spyGetDish = jest.spyOn(dishPrismaRepository, 'getDishById')
        spyGetDish.mockResolvedValue({
            dishId: "53f29b31-f86f-41d0-91a8-0e73fd82b2f6",
            dishName: "Plato nuevo",
            categoryId: "2000001",
            dishDescription: "Este es un plato de prueba",
            dishPrice: 20,
            restaurantId: "1a2a730e-ee3c-4d4f-9f19-2cab34838950",  //Does not match
            dishUrlImage: "urldeprueba",
            dishActive: true
        })

        await expect(insertOrder.create("3435255435223", "4g4g4g4-646-4f4f44g", arrayDishes)).rejects.toThrowError("The dishes do not belong to the same restaurant")
    })


    test("Should throw an error when there is a problem in prisma", async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByClientId')
        spyGetOrder.mockResolvedValue(arrayOrdersGood)
        
        const spyGetDish = jest.spyOn(dishPrismaRepository, 'getDishById')
        spyGetDish.mockRejectedValue(new Error('ERROR EN DISHES'))

        await expect(insertOrder.create("3435255435223", "4g4g4g4-646-4f4f44g", arrayDishes)).rejects.toThrowError("ERROR EN DISHES")
    })


    test("Should throw an error when there is a problem in prisma", async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByClientId')
        spyGetOrder.mockResolvedValue(arrayOrdersGood)
        
        const spyGetDish = jest.spyOn(dishPrismaRepository, 'getDishById')
        spyGetDish.mockResolvedValue({
            dishId: "53f29b31-f86f-41d0-91a8-0e73fd82b2f6",
            dishName: "Plato nuevo",
            categoryId: "2000001",
            dishDescription: "Este es un plato de prueba",
            dishPrice: 20,
            restaurantId: "4g4g4g4-646-4f4f44g",
            dishUrlImage: "urldeprueba",
            dishActive: true
        })

        const spyOrderId = jest.spyOn(orderUuidRepository, 'generateOrderId')
        spyOrderId.mockReturnValue('EFFEEEF44-G44G4-F4-4-F4')

        const spyInsertOrder = jest.spyOn(orderPrismaRepository, 'insertOrder')
        spyInsertOrder.mockRejectedValue(new Error('ERROR'))

        await expect(insertOrder.create("3435255435223", "4g4g4g4-646-4f4f44g", arrayDishes)).rejects.toBeInstanceOf(Error)
    })


    test("Should throw an error when there is a problem in prisma", async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByClientId')
        spyGetOrder.mockResolvedValue(arrayOrdersGood)
        
        const spyGetDish = jest.spyOn(dishPrismaRepository, 'getDishById')
        spyGetDish.mockResolvedValue({
            dishId: "53f29b31-f86f-41d0-91a8-0e73fd82b2f6",
            dishName: "Plato nuevo",
            categoryId: "2000001",
            dishDescription: "Este es un plato de prueba",
            dishPrice: 20,
            restaurantId: "4g4g4g4-646-4f4f44g",
            dishUrlImage: "urldeprueba",
            dishActive: true
        })

        const spyOrderId = jest.spyOn(orderUuidRepository, 'generateOrderId')
        spyOrderId.mockReturnValue('EFFEEEF44-G44G4-F4-4-F4')

        const spyInsertOrder = jest.spyOn(orderPrismaRepository, 'insertOrder')
        spyInsertOrder.mockResolvedValue({
            orderId: "a6079016-8368-463a-970e-f05df060a927",
            clientId: "4049358604195148646",
            orderDate: "2023-06-14T23:15:23.503Z",
            orderState: "Pending",
            chefId: null,
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
        })

        const spyInsertOrderDishes = jest.spyOn(orderDishesPrismaRepository, 'insertOrderDishes')
        spyInsertOrderDishes.mockRejectedValue(new Error('ERROR IN INSERT ORDER DISHES'))

        await expect(insertOrder.create("3435255435223", "4g4g4g4-646-4f4f44g", arrayDishes)).rejects.toThrowError('ERROR IN INSERT ORDER DISHES')
    })

})