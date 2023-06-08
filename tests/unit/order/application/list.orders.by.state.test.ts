import OrderPrismaRepository from "../../../../src/core/order/infraestructure/prisma/order.prisma.repository"
import RestaurantEmployeePrismaRepository from "../../../../src/core/restaurantemployee/infraestructure/prisma/restaurant.employee.prisma.repository"
import ListOrdersByState from "../../../../src/core/order/application/list.orders.by.state"
import { arrayOfOrders } from "../../../helpers/order/list.order.by.state.helper"

jest.mock("../../../../src/core/order/infraestructure/prisma/order.prisma.repository")
jest.mock("../../../../src/core/restaurantemployee/infraestructure/prisma/restaurant.employee.prisma.repository")

describe('List orders by state', () => {

    test('List all order by state and items per page successfully', async () => {
        const orderPrismaRepository = new OrderPrismaRepository()
        const restaurantEmployeePrismaRepository = new RestaurantEmployeePrismaRepository()

        const spyRestaurantEmployee = jest.spyOn(restaurantEmployeePrismaRepository, 'getRestaurantEmployeeById')
        const spyListOrders = jest.spyOn(orderPrismaRepository, 'listAllOrdersByState')

        spyRestaurantEmployee.mockResolvedValue({
            restaurantEmployeeId: "d2a71b65-df82-44e1-9462-0fcf02580c31",
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
            chefId: "3833470806868375603"
        })
        spyListOrders.mockResolvedValue(arrayOfOrders)
        
        const listOrdersByState = new ListOrdersByState(orderPrismaRepository, restaurantEmployeePrismaRepository)
        const listOrders = await listOrdersByState.listOrders('33430504539539593595', 'Pending', 2, 2)
        
        expect(listOrders).toHaveLength(2)
        expect(listOrders[0].orderState).toBe('Pending')
    })


    test('When restaurant employee does not exist', async () => {
        const orderPrismaRepository = new OrderPrismaRepository()
        const restaurantEmployeePrismaRepository = new RestaurantEmployeePrismaRepository()

        const spyRestaurantEmployee = jest.spyOn(restaurantEmployeePrismaRepository, 'getRestaurantEmployeeById')
        const spyListOrders = jest.spyOn(orderPrismaRepository, 'listAllOrdersByState')

        spyRestaurantEmployee.mockResolvedValue(null)
        spyListOrders.mockResolvedValue(arrayOfOrders)
        
        const listOrdersByState = new ListOrdersByState(orderPrismaRepository, restaurantEmployeePrismaRepository)
        
        await expect(listOrdersByState.listOrders('33430504539539593595', 'Pending', 2, 2)).rejects.toBeInstanceOf(Error)
    })


    test('When there is an error with restaurant employee', async () => {
        const orderPrismaRepository = new OrderPrismaRepository()
        const restaurantEmployeePrismaRepository = new RestaurantEmployeePrismaRepository()

        const spyRestaurantEmployee = jest.spyOn(restaurantEmployeePrismaRepository, 'getRestaurantEmployeeById')
        const spyListOrders = jest.spyOn(orderPrismaRepository, 'listAllOrdersByState')

        spyRestaurantEmployee.mockRejectedValue(new Error('ERROR IN RESTAURANT EMPLOYEE'))
        spyListOrders.mockResolvedValue(arrayOfOrders)
        
        const listOrdersByState = new ListOrdersByState(orderPrismaRepository, restaurantEmployeePrismaRepository)
        
        await expect(listOrdersByState.listOrders('33430504539539593595', 'Pending', 2, 2)).rejects.toBeInstanceOf(Error)
    })


    test('When orders not found', async () => {
        const orderPrismaRepository = new OrderPrismaRepository()
        const restaurantEmployeePrismaRepository = new RestaurantEmployeePrismaRepository()

        const spyRestaurantEmployee = jest.spyOn(restaurantEmployeePrismaRepository, 'getRestaurantEmployeeById')
        const spyListOrders = jest.spyOn(orderPrismaRepository, 'listAllOrdersByState')

        spyRestaurantEmployee.mockResolvedValue({
            restaurantEmployeeId: "d2a71b65-df82-44e1-9462-0fcf02580c31",
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
            chefId: "3833470806868375603"
        })
        spyListOrders.mockResolvedValue(null)
        
        const listOrdersByState = new ListOrdersByState(orderPrismaRepository, restaurantEmployeePrismaRepository)
        
        await expect(listOrdersByState.listOrders('33430504539539593595', 'Pending', 2, 2)).rejects.toBeInstanceOf(Error)
    })


    test('When there is an error with list orders', async () => {
        const orderPrismaRepository = new OrderPrismaRepository()
        const restaurantEmployeePrismaRepository = new RestaurantEmployeePrismaRepository()

        const spyRestaurantEmployee = jest.spyOn(restaurantEmployeePrismaRepository, 'getRestaurantEmployeeById')
        const spyListOrders = jest.spyOn(orderPrismaRepository, 'listAllOrdersByState')

        spyRestaurantEmployee.mockResolvedValue({
            restaurantEmployeeId: "d2a71b65-df82-44e1-9462-0fcf02580c31",
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
            chefId: "3833470806868375603"
        })
        spyListOrders.mockRejectedValue(new Error('ERROR IN LIST ORDERS'))
        
        const listOrdersByState = new ListOrdersByState(orderPrismaRepository, restaurantEmployeePrismaRepository)
        
        await expect(listOrdersByState.listOrders('33430504539539593595', 'Pending', 2, 2)).rejects.toBeInstanceOf(Error)
    })
})