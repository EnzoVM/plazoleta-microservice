import RestaurantEmployee from "../../../../src/core/restaurantemployee/domain/restaurant.employee.model"
import RestaurantEmployeeUuidRepository from "../../../../src/core/restaurantemployee/infraestructure/uuid/restaurant.employee.uuid.repository"

const restaurantEmployeeId: jest.Mocked<RestaurantEmployeeUuidRepository> = {
    generateRestaurantEmployeeId: jest.fn(() => 'rgtfrdt344tt-tygdddwww2-ffgtgthwe3433fff3')
}


describe('Restaurant Employee model', () => {

    test('Should create a new Restaurant Object', () => {
        const newRestaurantEmployee = new RestaurantEmployee({
            restaurantEmployeeId: restaurantEmployeeId.generateRestaurantEmployeeId(),
            restaurantId: "3443r4f4-g5g55-55h5h-h5h",
            chefId: "4f4g4g4g4g-gh5h-drh56j6j6j6-j6j"
        })
        
        expect(newRestaurantEmployee.restaurantEmployeeId).toBe('rgtfrdt344tt-tygdddwww2-ffgtgthwe3433fff3')
    })

})
