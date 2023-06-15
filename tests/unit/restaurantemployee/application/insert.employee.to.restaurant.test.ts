import RestaurantEmployeePrismaRepository from "../../../../src/core/restaurantemployee/infraestructure/prisma/restaurant.employee.prisma.repository"
import RestaurantEmployeeUuidRepository from "../../../../src/core/restaurantemployee/infraestructure/uuid/restaurant.employee.uuid.repository"
import InsertEmployeeToRestaurant from "../../../../src/core/restaurantemployee/application/insert.employee.to.restaurant"

jest.mock("../../../../src/core/restaurantemployee/infraestructure/prisma/restaurant.employee.prisma.repository")
jest.mock("../../../../src/core/restaurantemployee/infraestructure/uuid/restaurant.employee.uuid.repository")

describe('Insert employee to restaurant', () => {

    let restaurantEmployeePrismaRepository
    let restaurantEmployeeUuidRepository
    let insertEmployeeToRestaurant: InsertEmployeeToRestaurant

    beforeEach(() => {
        restaurantEmployeePrismaRepository = new RestaurantEmployeePrismaRepository()
        restaurantEmployeeUuidRepository = new RestaurantEmployeeUuidRepository()
        insertEmployeeToRestaurant = new InsertEmployeeToRestaurant(
            restaurantEmployeePrismaRepository,
            restaurantEmployeeUuidRepository
        )
    })
    
    afterEach(() => {
        jest.restoreAllMocks()
    })

    
    test('Insert a employee to restaurant successfully', async () => {
        const spyRestaurantEmployeeFound = jest.spyOn(restaurantEmployeePrismaRepository, 'getRestaurantEmployeeById')
        const spyInsertRestaurantEmployee = jest.spyOn(restaurantEmployeePrismaRepository, 'insertEmployeeToRestaurant')
        const spyGenerateRestaurantEmployeeId = jest.spyOn(restaurantEmployeeUuidRepository, 'generateRestaurantEmployeeId')

        spyRestaurantEmployeeFound.mockResolvedValue(null)
        spyGenerateRestaurantEmployeeId.mockReturnValue('4F44GG5-6H6H5G-5F4F4FG54G')
        spyInsertRestaurantEmployee.mockResolvedValue({
            restaurantEmployeeId: restaurantEmployeeUuidRepository.generateRestaurantEmployeeId(),
            restaurantId: "3443r4f4-g5g55-55h5h-h5h",
            chefId: "4f4g4g4g4g-gh5h-drh56j6j6j6-j6j"
        })

        const employeeRestaurantSaved = await insertEmployeeToRestaurant.insertEmployeeToRestaurant('3443r4f4-g5g55-55h5h-h5h', '4f4g4g4g4g-gh5h-drh56j6j6j6-j6j')

        expect(employeeRestaurantSaved.restaurantEmployeeId).toStrictEqual('4F44GG5-6H6H5G-5F4F4FG54G')
        expect(employeeRestaurantSaved.chefId).toStrictEqual('4f4g4g4g4g-gh5h-drh56j6j6j6-j6j')
    })


    test('When a employee is already assigned to this restaurant', async () => {
        const spyRestaurantEmployeeFound = jest.spyOn(restaurantEmployeePrismaRepository, 'getRestaurantEmployeeById')

        spyRestaurantEmployeeFound.mockResolvedValue({
            restaurantEmployeeId: "4F44GG5-6H6H5G-5F4F4FG54G",
            restaurantId: "3443r4f4-g5g55-55h5h-h5h",
            chefId: "4f4g4g4g4g-gh5h-drh56j6j6j6-j6j"
        })

        await expect(insertEmployeeToRestaurant.insertEmployeeToRestaurant('3443r4f4-g5g55-55h5h-h5h', '4f4g4g4g4g-gh5h-drh56j6j6j6-j6j')).rejects.toThrowError('This employee is already assigned to this restaurant')
    })


    test('When there is a problem with get restaurant employee', async () => {
        const spyRestaurantEmployeeFound = jest.spyOn(restaurantEmployeePrismaRepository, 'getRestaurantEmployeeById')

        spyRestaurantEmployeeFound.mockRejectedValue(new Error('ERROR IN GET EMPLOYEE RESTAURANT'))

        await expect(insertEmployeeToRestaurant.insertEmployeeToRestaurant('3443r4f4-g5g55-55h5h-h5h', '4f4g4g4g4g-gh5h-drh56j6j6j6-j6j')).rejects.toThrowError('ERROR IN GET EMPLOYEE RESTAURANT')
    })


    test('when there is a problem with generation ID', async () => {
        const spyRestaurantEmployeeFound = jest.spyOn(restaurantEmployeePrismaRepository, 'getRestaurantEmployeeById')
        const spyGenerateRestaurantEmployeeId = jest.spyOn(restaurantEmployeeUuidRepository, 'generateRestaurantEmployeeId')

        spyRestaurantEmployeeFound.mockResolvedValue(null)
        spyGenerateRestaurantEmployeeId.mockImplementation(() => {
            throw new Error('ERROR IN GENERATE ID')
        })

        await expect(insertEmployeeToRestaurant.insertEmployeeToRestaurant('3443r4f4-g5g55-55h5h-h5h', '4f4g4g4g4g-gh5h-drh56j6j6j6-j6j')).rejects.toThrowError('ERROR IN GENERATE ID')
    })
})