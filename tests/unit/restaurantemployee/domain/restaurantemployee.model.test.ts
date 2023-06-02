import RestaurantEmployee from "../../../../src/core/restaurantemployee/domain/restaurant.employee.model"
import RestaurantEmployeeUuidRepository from "../../../../src/core/restaurantemployee/infraestructure/uuid/restaurant.employee.uuid.repository.ts"

const restaurantEmployeeId: jest.Mocked<RestaurantEmployeeUuidRepository> = {
    generateRestaurantEmployeeId: jest.fn(() => 'rtgtyhfdss-4f4frr322233-rttdsss')
}

describe('RestaurantEmployee model', () => {

    test('Should create a new RestaurantEmployee Object', () => {
        const newRestaurantEmployee = new RestaurantEmployee({
            restaurantEmployeeId: restaurantEmployeeId.generateRestaurantEmployeeId(),
            restaurantId: "08f71c12-407f-44fa-a287-8ae32fef9e0b",
            chefId: "7004894246724579938"
        })
        
        expect(newRestaurantEmployee.restaurantEmployeeId).toBe('rtgtyhfdss-4f4frr322233-rttdsss')
    })

})