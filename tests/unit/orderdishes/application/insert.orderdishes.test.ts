import OrderDishesPrismaRepository from "../../../../src/core/orderdishes/infraestructure/prisma/orderdishes.prisma.repository"
import OrderDishesUuidRepository from "../../../../src/core/orderdishes/infraestructure/uuid/orderdishes.uuid.repository"
import InsertOrderDishes from "../../../../src/core/orderdishes/application/insert.orderdishes"

jest.mock("../../../../src/core/orderdishes/infraestructure/prisma/orderdishes.prisma.repository")
jest.mock("../../../../src/core/orderdishes/infraestructure/uuid/orderdishes.uuid.repository")

describe('Insert new OrderDishes', () => {

    let orderDishesPrismaRepository
    let orderDishesUuidRepository
    let insertOrderDishes: InsertOrderDishes

    beforeEach(() => {
        orderDishesPrismaRepository = new OrderDishesPrismaRepository()
        orderDishesUuidRepository = new OrderDishesUuidRepository()
        insertOrderDishes = new InsertOrderDishes(
            orderDishesPrismaRepository, 
            orderDishesUuidRepository
        )
    })
    
    afterEach(() => {
        jest.restoreAllMocks()
    })

    test('Insert a orderdishes successfully', async () => {
        const spyInsertOrderDishes = jest.spyOn(orderDishesPrismaRepository, 'insertOrderDishes')
        const spyOrderDishesId = jest.spyOn(orderDishesUuidRepository, 'generateOrderDishesId')

        spyOrderDishesId.mockReturnValue('f4f4fmrfrfr-f4f4g4-d3e3g5h')
        spyInsertOrderDishes.mockResolvedValue({
            orderDishesId: orderDishesUuidRepository.generateOrderDishesId(), 
            orderId: "frty65erf4f-55-6443dd22s", 
            dishId: "53013158-5eb0-4b00-9fe3-d16434ca7382", 
            cantidad: 10
        })

        const orderDishesInserted = await insertOrderDishes.create('frty65erf4f-55-6443dd22s', '53013158-5eb0-4b00-9fe3-d16434ca7382', 10)

        expect(orderDishesInserted.orderDishesId).toStrictEqual('f4f4fmrfrfr-f4f4g4-d3e3g5h')
        
    })


    test('When some or all parameters are missing', async () => {
        //Dish Id is missing
        //@ts-ignore
        await expect(insertOrderDishes.create('frty65erf4f-55-6443dd22s', 10)).rejects.toBeInstanceOf(Error)
        
    })


    test('When there is an error in the generation of the orderdish id', async () => {
        const spyInsertOrderDishes = jest.spyOn(orderDishesPrismaRepository, 'insertOrderDishes')
        const spyOrderDishesId = jest.spyOn(orderDishesUuidRepository, 'generateOrderDishesId')

        spyOrderDishesId.mockImplementation(() => {
            throw new Error('ERROR IN ORDERDISH ID')
        })
        spyInsertOrderDishes.mockResolvedValue({
            orderDishesId: 'f4f4fmrfrfr-f4f4g4-d3e3g5h', 
            orderId: "frty65erf4f-55-6443dd22s", 
            dishId: "53013158-5eb0-4b00-9fe3-d16434ca7382", 
            cantidad: 10
        })

        await expect(insertOrderDishes.create('frty65erf4f-55-6443dd22s', '53013158-5eb0-4b00-9fe3-d16434ca7382', 10)).rejects.toBeInstanceOf(Error)
        
    })


    test('When there is an error in the generation of the orderdish id', async () => {
        const spyInsertOrderDishes = jest.spyOn(orderDishesPrismaRepository, 'insertOrderDishes')
        const spyOrderDishesId = jest.spyOn(orderDishesUuidRepository, 'generateOrderDishesId')

        spyOrderDishesId.mockReturnValue('f4f4fmrfrfr-f4f4g4-d3e3g5h')
        spyInsertOrderDishes.mockRejectedValue(new Error('ERROR'))

        await expect(insertOrderDishes.create('frty65erf4f-55-6443dd22s', '53013158-5eb0-4b00-9fe3-d16434ca7382', 10)).rejects.toBeInstanceOf(Error)
    })
})