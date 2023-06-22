import OrderPrismaRepository from "../../../../src/core/order/infraestructure/prisma/order.prisma.repository"
import MessageServiceRepository from "../../../../src/core/order/infraestructure/services/message.service.repository"
import NotifyOrderReady from "../../../../src/core/order/application/notify.order.ready"

jest.mock("../../../../src/core/order/infraestructure/prisma/order.prisma.repository")
jest.mock("../../../../src/core/order/infraestructure/services/message.service.repository")

describe('Cancel Order', () => {

    let orderPrismaRepository
    let messageServiceRepository
    let notifyOrderReady: NotifyOrderReady

    beforeEach(() => {
        orderPrismaRepository = new OrderPrismaRepository()
        messageServiceRepository = new  MessageServiceRepository()
        notifyOrderReady = new NotifyOrderReady(orderPrismaRepository, messageServiceRepository)
    })
    
    afterEach(() => {
        jest.restoreAllMocks()
    })


    test('When order is notify successfully', async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByOrderId')
        const spyUpdateOrder = jest.spyOn(orderPrismaRepository, 'updateOrderById')
        const spyMessage = jest.spyOn(messageServiceRepository, 'sendMessage')

        spyGetOrder.mockResolvedValue({
            orderId: '082ff803-dec5-4f65-9f7b-2337fbbe6546',
            clientId: '3847260700560011318',
            //@ts-ignore
            orderDate: '2023-06-22T15:45:09.657Z',
            orderState: 'In preparation',
            chefId: '4050481215012299825',
            restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc'
        })

        spyUpdateOrder.mockResolvedValue({
            orderId: '082ff803-dec5-4f65-9f7b-2337fbbe6546',
            clientId: '3847260700560011318',
            //@ts-ignore
            orderDate: '2023-06-22T15:45:09.657Z',
            orderState: 'Ready',
            chefId: '4050481215012299825',
            restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc'
        })

        spyMessage.mockResolvedValue('Se envió el mensaje correctamente')

        const notifyOrder = await notifyOrderReady.notifyOrder('082ff803-dec5-4f65-9f7b-2337fbbe6546', '1234', '+51958785896')

        expect(notifyOrder.orderReady.orderState).toStrictEqual('Ready')
    })


    test('When order not found', async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByOrderId')

        spyGetOrder.mockResolvedValue(null)

        await expect(notifyOrderReady.notifyOrder('082ff803-dec5-4f65-9f7b-2337fbbe6546', '1234', '+51958785896')).rejects.toThrowError('Order not found')
    })


    test('When order state not coincide', async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByOrderId')

        spyGetOrder.mockResolvedValue({
            orderId: '082ff803-dec5-4f65-9f7b-2337fbbe6546',
            clientId: '3847260700560011318',
            //@ts-ignore
            orderDate: '2023-06-22T15:45:09.657Z',
            orderState: 'Pending',
            chefId: '4050481215012299825',
            restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc'
        })

        await expect(notifyOrderReady.notifyOrder('082ff803-dec5-4f65-9f7b-2337fbbe6546', '1234', '+51958785896')).rejects.toThrowError('The request must be in preparation status')
    })


    test('When there is an error with notify order', async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByOrderId')
        const spyUpdateOrder = jest.spyOn(orderPrismaRepository, 'updateOrderById')
        const spyMessage = jest.spyOn(messageServiceRepository, 'sendMessage')

        spyGetOrder.mockResolvedValue({
            orderId: '082ff803-dec5-4f65-9f7b-2337fbbe6546',
            clientId: '3847260700560011318',
            //@ts-ignore
            orderDate: '2023-06-22T15:45:09.657Z',
            orderState: 'In preparation',
            chefId: '4050481215012299825',
            restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc'
        })

        spyUpdateOrder.mockResolvedValue(null)

        spyMessage.mockResolvedValue('Se envió el mensaje correctamente')

        await expect(notifyOrderReady.notifyOrder('082ff803-dec5-4f65-9f7b-2337fbbe6546', '1234', '+51958785896')).rejects.toThrowError('Order can not be ready')
    })
})

