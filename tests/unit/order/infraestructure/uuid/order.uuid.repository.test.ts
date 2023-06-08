import OrderUuidRepository from '../../../../../src/core/order/infraestructure/uuid/order.uuid.repository'
import { v4 as uuid } from 'uuid'

jest.mock("uuid")

describe('Generate user Id', () => {

    test('Generate Id successfully', () => {
        (uuid as jest.Mock).mockReturnValueOnce('efffef5rgrgrgr5665g5-6y5y665g-5g')

        const orderUuidRepository = new OrderUuidRepository()
        const generateOrderId = orderUuidRepository.generateOrderId()
        
        expect(generateOrderId).toBe('efffef5rgrgrgr5665g5-6y5y665g-5g')
    })
})