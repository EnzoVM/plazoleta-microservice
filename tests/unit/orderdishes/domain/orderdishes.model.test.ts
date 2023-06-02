import OrderDishes from "../../../../src/core/orderdishes/domain/orderdishes.model"
import OrderDishesUuidRepository from "../../../../src/core/orderdishes/infraestructure/uuid/orderdishes.uuid.repository"

const orderDishesId: jest.Mocked<OrderDishesUuidRepository> = {
    generateOrderDishesId: jest.fn(() => 'frgtyurg5673-dfffrrrr23444-ddff')
}

describe('OrderDishes model', () => {

    test('Should create a new OrderDishes Object', () => {
        const newOrderDishes = new OrderDishes({
            orderDishesId: orderDishesId.generateOrderDishesId(), 
            orderId: "frty65erf4f-55-6443dd22s", 
            dishId: "53013158-5eb0-4b00-9fe3-d16434ca7382", 
            cantidad: 10
        })
        
        expect(newOrderDishes.orderDishesId).toBe('frgtyurg5673-dfffrrrr23444-ddff')
    })

})