import OrderPrismaRepository from "../../../../src/core/order/infraestructure/prisma/order.prisma.repository"
import UpdateOrderByOrderId from "../../../../src/core/order/application/update.order.by.order.id"

jest.mock("../../../../src/core/order/infraestructure/prisma/order.prisma.repository")

describe('Update order by order id', () => {

    test('Update order successfully', async () => {
        const orderPrismaRepository = new OrderPrismaRepository()

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

        const updateOrderByOrderId = new UpdateOrderByOrderId(orderPrismaRepository)
        const orderUpdated = await updateOrderByOrderId.updateOrder('822e5b7d-fcb5-47af-bb9b-ac9a8c513d29', 'In preparation', '34343395959359394294')

        expect(orderUpdated.orderState).toStrictEqual('In preparation')
    })


    test('When order state is missing', async () => {
        const orderPrismaRepository = new OrderPrismaRepository()

        const updateOrderByOrderId = new UpdateOrderByOrderId(orderPrismaRepository)

        //State is missing
        //@ts-ignore
        await expect(updateOrderByOrderId.updateOrder('822e5b7d-fcb5-47af-bb9b-ac9a8c513d29', '34343395959359394294')).rejects.toBeInstanceOf(Error)
    })


    test('When order not found', async () => {
        const orderPrismaRepository = new OrderPrismaRepository()

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

        const updateOrderByOrderId = new UpdateOrderByOrderId(orderPrismaRepository)

        await expect(updateOrderByOrderId.updateOrder('822e5b7d-fcb5-47af-bb9b-ac9a8c513d29', 'In preparation', '34343395959359394294')).rejects.toBeInstanceOf(Error)
    })


    test('When there is an error with get order', async () => {
        const orderPrismaRepository = new OrderPrismaRepository()

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

        const updateOrderByOrderId = new UpdateOrderByOrderId(orderPrismaRepository)

        await expect(updateOrderByOrderId.updateOrder('822e5b7d-fcb5-47af-bb9b-ac9a8c513d29', 'In preparation', '34343395959359394294')).rejects.toBeInstanceOf(Error)
    })

    
    test('When the state is different to Pending', async () => {
        const orderPrismaRepository = new OrderPrismaRepository()

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

        const updateOrderByOrderId = new UpdateOrderByOrderId(orderPrismaRepository)

        await expect(updateOrderByOrderId.updateOrder('822e5b7d-fcb5-47af-bb9b-ac9a8c513d29', 'In preparation', '34343395959359394294')).rejects.toBeInstanceOf(Error)
    })


    test('When the state is different to Pending', async () => {
        const orderPrismaRepository = new OrderPrismaRepository()

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

        const updateOrderByOrderId = new UpdateOrderByOrderId(orderPrismaRepository)

        await expect(updateOrderByOrderId.updateOrder('822e5b7d-fcb5-47af-bb9b-ac9a8c513d29', 'In preparation', '34343395959359394294')).rejects.toBeInstanceOf(Error)
    })


    test('When the state is different to Pending', async () => {
        const orderPrismaRepository = new OrderPrismaRepository()

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

        const updateOrderByOrderId = new UpdateOrderByOrderId(orderPrismaRepository)

        await expect(updateOrderByOrderId.updateOrder('822e5b7d-fcb5-47af-bb9b-ac9a8c513d29', 'In preparation', '34343395959359394294')).rejects.toBeInstanceOf(Error)
    })
})