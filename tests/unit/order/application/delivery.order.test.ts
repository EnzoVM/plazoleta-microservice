import OrderPrismaRepository from "../../../../src/core/order/infraestructure/prisma/order.prisma.repository"
import { PinValidator } from "../../../../src/core/order/domain/order.pin.validator"
import DeliverOrder from "../../../../src/core/order/application/deliver.order"

jest.mock("../../../../src/core/order/infraestructure/prisma/order.prisma.repository")
jest.mock("../../../../src/core/order/domain/order.pin.validator")

describe('Cancel Order', () => {

    let orderPrismaRepository
    let pinValidator
    let deliverOrder: DeliverOrder

    beforeEach(() => {
        orderPrismaRepository = new OrderPrismaRepository()
        pinValidator = new PinValidator()
        deliverOrder = new DeliverOrder(orderPrismaRepository)
    })
    
    afterEach(() => {
        jest.restoreAllMocks()
    })


    test('When order not found', async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByOrderId')

        spyGetOrder.mockResolvedValue(null)

        await expect(deliverOrder.deliverOrder('082ff803-dec5-4f65-9f7b-2337fbbe6546', '1234')).rejects.toThrowError('Order not found')
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

        await expect(deliverOrder.deliverOrder('082ff803-dec5-4f65-9f7b-2337fbbe6546', '1234')).rejects.toThrowError('The request must be in ready status')
    })


    test('When the ping not coincide', async () => {
        const spyGetOrder = jest.spyOn(orderPrismaRepository, 'getOrderByOrderId')
        const spyPinValidator = jest.spyOn(pinValidator, 'validatePin')

        spyGetOrder.mockResolvedValue({
            orderId: '082ff803-dec5-4f65-9f7b-2337fbbe6546',
            clientId: '3847260700560011318',
            //@ts-ignore
            orderDate: '2023-06-22T15:45:09.657Z',
            orderState: 'Ready',
            chefId: '4050481215012299825',
            restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc'
        })

        spyPinValidator.mockReturnValue(false)

        await expect(deliverOrder.deliverOrder('082ff803-dec5-4f65-9f7b-2337fbbe6546', '1234')).rejects.toThrowError('The PIN is incorrect')
    })
})
