import RestaurantEmployeePrismaRepository from "../../../../src/core/restaurantemployee/infraestructure/prisma/restaurant.employee.prisma.repository"
import GetRestaurantEmployeeByEmployeeId from "../../../../src/core/restaurantemployee/application/get.restaurant.employee.by.employee.id"

jest.mock("../../../../src/core/restaurantemployee/infraestructure/prisma/restaurant.employee.prisma.repository")

describe('Get Dish By Id', () => {

    let restaurantEmployeePrismaRepository
    let getRestaurantEmployeeByEmployeeId: GetRestaurantEmployeeByEmployeeId

    beforeEach(() => {
        restaurantEmployeePrismaRepository = new RestaurantEmployeePrismaRepository()
        getRestaurantEmployeeByEmployeeId = new GetRestaurantEmployeeByEmployeeId(restaurantEmployeePrismaRepository)
    })
    
    afterEach(() => {
        jest.restoreAllMocks()
    })


    test('Get a restaurantEmployee successfully', async () => {
        const spyGetRestaurantEmployee = jest.spyOn(restaurantEmployeePrismaRepository, 'getRestaurantEmployeeById')
        
        spyGetRestaurantEmployee.mockResolvedValueOnce({
            restaurantEmployeeId: "frrg5-h-6j6j7j-g5g5h66",
            restaurantId: "3443r4f4-g5g55-55h5h-h5h",
            chefId: "4f4g4g4g4g-gh5h-drh56j6j6j6-j6j"
        })
        
        const restaurantEmployeeFound = await getRestaurantEmployeeByEmployeeId.getRestaurantEmployee('4f4g4g4g4g-gh5h-drh56j6j6j6-j6j')

        expect(restaurantEmployeeFound.restaurantEmployeeId).toStrictEqual('frrg5-h-6j6j7j-g5g5h66')
        expect(restaurantEmployeeFound.restaurantId).toStrictEqual('3443r4f4-g5g55-55h5h-h5h')
    })


    test('When dish not found', async () => {
        const spyGetRestaurantEmployee = jest.spyOn(restaurantEmployeePrismaRepository, 'getRestaurantEmployeeById')

        spyGetRestaurantEmployee.mockResolvedValue(null)

        await expect(getRestaurantEmployeeByEmployeeId.getRestaurantEmployee('4f4g4g4g4g-gh5h-drh56j6j6j6-j6j')).rejects.toThrowError('Restaurant employee not found')
    })


    test('When there is an error with get dish by id', async () => {
        const spyGetRestaurantEmployee = jest.spyOn(restaurantEmployeePrismaRepository, 'getRestaurantEmployeeById')

        spyGetRestaurantEmployee.mockRejectedValue(new Error('ERROR IN GET RESTAURANT EMPLOYEE'))

        await expect(getRestaurantEmployeeByEmployeeId.getRestaurantEmployee('4f4g4g4g4g-gh5h-drh56j6j6j6-j6j')).rejects.toThrowError('ERROR IN GET RESTAURANT EMPLOYEE')
    })
})