import OrderDishesUuidRepository from '../../../../../src/core/orderdishes/infraestructure/uuid/orderdishes.uuid.repository'
import { v4 as uuid } from 'uuid'

jest.mock("uuid")

describe('Generate user Id', () => {

    test('Generate Id successfully', () => {
        (uuid as jest.Mock).mockReturnValueOnce('efg5-6y5y665g-5g')

        const orderDishesUuidRepository = new OrderDishesUuidRepository()
        const generateOrderDishesId = orderDishesUuidRepository.generateOrderDishesId()
        
        expect(generateOrderDishesId).toBe('efg5-6y5y665g-5g')
    })
})