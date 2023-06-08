import Order from "../../../../src/core/order/domain/order.model"
import OrderUuidRepository from "../../../../src/core/order/infraestructure/uuid/order.uuid.repository";

const orderId: jest.Mocked<OrderUuidRepository> = {
    generateOrderId: jest.fn(() => 'frty65erf4f-55-6443dd22s')
}

describe('Order model', () => {

    test('Should create a new Order Object', () => {
        const newOrder = new Order({
            orderId: orderId.generateOrderId(),
            clientId: "3977295525517014834",
            orderState: "Pending",
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
        })

        
        expect(newOrder.orderId).toBe('frty65erf4f-55-6443dd22s')
    })

})