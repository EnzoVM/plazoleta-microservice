import RestaurantEmployeeUuidRepository from "../../../../../src/core/restaurantemployee/infraestructure/uuid/restaurant.employee.uuid.repository"
import { v4 as uuid } from 'uuid'

jest.mock("uuid")

describe('Generate restaurant employee Id', () => {

    test('Generate Id successfully', () => {
        (uuid as jest.Mock).mockReturnValueOnce('efffef55665g5-6y5y665g-5g5g5g55-4tttf4f')

        const restaurantEmployeeUuidRepository = new RestaurantEmployeeUuidRepository()
        const generateRestaurantEmployeeId = restaurantEmployeeUuidRepository.generateRestaurantEmployeeId()
        
        expect(generateRestaurantEmployeeId).toBe('efffef55665g5-6y5y665g-5g5g5g55-4tttf4f')
    })
})