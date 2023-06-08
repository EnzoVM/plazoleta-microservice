import RestaurantUuidRepository from '../../../../../src/core/restaurant/infraestructure/uuid/restaurant.uuid.repository'
import { v4 as uuid } from 'uuid'

jest.mock("uuid")

describe('Generate restaurant Id', () => {

    test('Generate Id successfully', () => {
        (uuid as jest.Mock).mockReturnValueOnce('efffef55665g5-6y5y665g-5g5g5g55')

        const restaurantUuidRepository = new RestaurantUuidRepository()
        const generateRestaurantId = restaurantUuidRepository.generateRestaurantId()
        
        expect(generateRestaurantId).toBe('efffef55665g5-6y5y665g-5g5g5g55')
    })
})