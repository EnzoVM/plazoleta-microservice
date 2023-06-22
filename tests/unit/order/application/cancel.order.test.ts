import OrderPrismaRepository from "../../../../src/core/order/infraestructure/prisma/order.prisma.repository"
import CancelOrder from "../../../../src/core/order/application/cancel.order"

jest.mock("../../../../src/core/order/infraestructure/prisma/order.prisma.repository")

describe('Cancel Order', () => {

    let orderPrismaRepository
    let cancelOrder: CancelOrder

    beforeEach(() => {
        orderPrismaRepository = new OrderPrismaRepository()
        cancelOrder = new CancelOrder(orderPrismaRepository)
    })
    
    afterEach(() => {
        jest.restoreAllMocks()
    })


    test('When order is cancelled successfully', async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByOrderId')
        const spyUpdateOrder = jest.spyOn(orderPrismaRepository, 'updateOrderById')

        spyGetOrder.mockResolvedValue({
            orderId: '082ff803-dec5-4f65-9f7b-2337fbbe6546',
            clientId: '3847260700560011318',
            //@ts-ignore
            orderDate: '2023-06-22T15:45:09.657Z',
            orderState: 'Pending',
            chefId: null,
            restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc'
        })

        spyUpdateOrder.mockResolvedValue({
            orderId: '082ff803-dec5-4f65-9f7b-2337fbbe6546',
            clientId: '3847260700560011318',
            //@ts-ignore
            orderDate: '2023-06-22T15:45:09.657Z',
            orderState: 'Cancelled',
            chefId: null,
            restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc'
        })

        const orderCanceled = await cancelOrder.cancelOrder('082ff803-dec5-4f65-9f7b-2337fbbe6546', '3847260700560011318')

        expect(orderCanceled.orderState).toStrictEqual('Cancelled')
    })


    test('When order not found', async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByOrderId')

        spyGetOrder.mockResolvedValue(null)

        await expect(cancelOrder.cancelOrder('082ff803-dec5-4f65-9f7b-2337fbbe6546', '3847260700560011318')).rejects.toThrowError('Order not found')
    })


    test('When client id is not coincide', async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByOrderId')

        spyGetOrder.mockResolvedValue({
            orderId: '082ff803-dec5-4f65-9f7b-2337fbbe6546',
            clientId: '3847260700560011318',
            //@ts-ignore
            orderDate: '2023-06-22T15:45:09.657Z',
            orderState: 'Pending',
            chefId: null,
            restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc'
        })

        await expect(cancelOrder.cancelOrder('082ff803-dec5-4f65-9f7b-2337fbbe6546', '4363656363563636')).rejects.toThrowError('The order does not belong to the customer')
    })


    test('When order state not coincide', async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByOrderId')

        spyGetOrder.mockResolvedValue({
            orderId: '082ff803-dec5-4f65-9f7b-2337fbbe6546',
            clientId: '3847260700560011318',
            //@ts-ignore
            orderDate: '2023-06-22T15:45:09.657Z',
            orderState: 'In preparation',
            chefId: null,
            restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc'
        })

        await expect(cancelOrder.cancelOrder('082ff803-dec5-4f65-9f7b-2337fbbe6546', '3847260700560011318')).rejects.toThrowError('Sorry, your order is already being prepared and cannot be cancelled')
    })


    test('When there is an error with cancel order', async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByOrderId')
        const spyUpdateOrder = jest.spyOn(orderPrismaRepository, 'updateOrderById')

        spyGetOrder.mockResolvedValue({
            orderId: '082ff803-dec5-4f65-9f7b-2337fbbe6546',
            clientId: '3847260700560011318',
            //@ts-ignore
            orderDate: '2023-06-22T15:45:09.657Z',
            orderState: 'Pending',
            chefId: null,
            restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc'
        })

        spyUpdateOrder.mockResolvedValue(null)

        await expect(cancelOrder.cancelOrder('082ff803-dec5-4f65-9f7b-2337fbbe6546', '3847260700560011318')).rejects.toThrowError('Order can not be cancelled')
    })
})