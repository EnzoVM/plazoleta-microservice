import OrderPrismaRepository from "../../../../src/core/order/infraestructure/prisma/order.prisma.repository"
import AssignOrderToEmployee from "../../../../src/core/order/application/assign.order.to.employee"

jest.mock("../../../../src/core/order/infraestructure/prisma/order.prisma.repository")

describe('Update order by order id', () => {

    let orderPrismaRepository
    let assignOrderToEmployee: AssignOrderToEmployee

    beforeEach(() => {
        orderPrismaRepository = new OrderPrismaRepository()
        assignOrderToEmployee = new AssignOrderToEmployee(orderPrismaRepository)
    })
    
    afterEach(() => {
        jest.restoreAllMocks()
    })


    test('Update order successfully', async () => {
        const spyUpdateOrder = jest.spyOn(orderPrismaRepository, 'updateOrderByOrderId')
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByOrderId')

        spyGetOrder.mockResolvedValue({
            orderId: '27181854-8647-4b0a-b963-02e4701df97c',    
            clientId: '7016945088243982950',
            //@ts-ignore
            orderDate: "2023-05-29T23:31:58.502Z",
            orderState: 'Pending',
            chefId: null,
            restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc'
        })

        spyUpdateOrder.mockResolvedValue({
            orderId: "27181854-8647-4b0a-b963-02e4701df97c",
            clientId: "7016945088243982950",
            //@ts-ignore
            orderDate: "2023-05-29T23:31:58.502Z",
            orderState: "In preparation",
            chefId: "4050481215012299825",
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
        })

        const orderUpdated = await assignOrderToEmployee.assignOrder('822e5b7d-fcb5-47af-bb9b-ac9a8c513d29', '34343395959359394294')

        expect(orderUpdated.orderState).toStrictEqual('In preparation')
    })

    test('When order not found', async () => {
        const spyUpdateOrder = jest.spyOn(orderPrismaRepository, 'updateOrderByOrderId')
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByOrderId')

        spyGetOrder.mockResolvedValue(null)

        spyUpdateOrder.mockResolvedValue({
            orderId: "27181854-8647-4b0a-b963-02e4701df97c",
            clientId: "7016945088243982950",
            //@ts-ignore
            orderDate: "2023-05-29T23:31:58.502Z",
            orderState: "In preparation",
            chefId: "4050481215012299825",
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
        })

        await expect(assignOrderToEmployee.assignOrder('822e5b7d-fcb5-47af-bb9b-ac9a8c513d29', '34343395959359394294')).rejects.toBeInstanceOf(Error)
    })


    test('When there is an error with get order', async () => {
        const spyUpdateOrder = jest.spyOn(orderPrismaRepository, 'updateOrderByOrderId')
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByOrderId')

        spyGetOrder.mockRejectedValue(new Error('ERROR'))

        spyUpdateOrder.mockResolvedValue({
            orderId: "27181854-8647-4b0a-b963-02e4701df97c",
            clientId: "7016945088243982950",
            //@ts-ignore
            orderDate: "2023-05-29T23:31:58.502Z",
            orderState: "In preparation",
            chefId: "4050481215012299825",
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
        })

        await expect(assignOrderToEmployee.assignOrder('822e5b7d-fcb5-47af-bb9b-ac9a8c513d29', '34343395959359394294')).rejects.toBeInstanceOf(Error)
    })

    
    test('When the state is different to Pending', async () => {
        const spyUpdateOrder = jest.spyOn(orderPrismaRepository, 'updateOrderByOrderId')
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByOrderId')

        spyGetOrder.mockResolvedValue({
            orderId: '27181854-8647-4b0a-b963-02e4701df97c',    
            clientId: '7016945088243982950',
            //@ts-ignore
            orderDate: "2023-05-29T23:31:58.502Z",
            orderState: 'In preparation',
            chefId: null,
            restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc'
        })

        spyUpdateOrder.mockResolvedValue({
            orderId: "27181854-8647-4b0a-b963-02e4701df97c",
            clientId: "7016945088243982950",
            //@ts-ignore
            orderDate: "2023-05-29T23:31:58.502Z",
            orderState: "In preparation",
            chefId: "4050481215012299825",
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
        })

        await expect(assignOrderToEmployee.assignOrder('822e5b7d-fcb5-47af-bb9b-ac9a8c513d29', '34343395959359394294')).rejects.toBeInstanceOf(Error)
    })


    test('When the state is different to Pending', async () => {
        const spyUpdateOrder = jest.spyOn(orderPrismaRepository, 'updateOrderByOrderId')
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByOrderId')

        spyGetOrder.mockResolvedValue({
            orderId: '27181854-8647-4b0a-b963-02e4701df97c',    
            clientId: '7016945088243982950',
            //@ts-ignore
            orderDate: "2023-05-29T23:31:58.502Z",
            orderState: 'Pending',
            chefId: null,
            restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc'
        })

        spyUpdateOrder.mockResolvedValue(null)

        await expect(assignOrderToEmployee.assignOrder('822e5b7d-fcb5-47af-bb9b-ac9a8c513d29', '34343395959359394294')).rejects.toBeInstanceOf(Error)
    })


    test('When the state is different to Pending', async () => {
        const spyUpdateOrder = jest.spyOn(orderPrismaRepository, 'updateOrderByOrderId')
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByOrderId')

        spyGetOrder.mockResolvedValue({
            orderId: '27181854-8647-4b0a-b963-02e4701df97c',    
            clientId: '7016945088243982950',
            //@ts-ignore
            orderDate: "2023-05-29T23:31:58.502Z",
            orderState: 'Pending',
            chefId: null,
            restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc'
        })

        spyUpdateOrder.mockRejectedValue(new Error('ERROR'))

        await expect(assignOrderToEmployee.assignOrder('822e5b7d-fcb5-47af-bb9b-ac9a8c513d29', '34343395959359394294')).rejects.toBeInstanceOf(Error)
    })
})