import OrderDishesDTO from "../../../../src/core/orderdishes/domain/orderdishes.dto"
import { ValidationError, validate } from "class-validator"

describe('OrderDishes DTO model', () => {

    test('The data is entered correctly', async () => {

        const errorOrderDishesData = await validate(new OrderDishesDTO({
            orderId: "frty65erf4f-55-6443dd22s", 
            dishId: "53013158-5eb0-4b00-9fe3-d16434ca7382", 
            cantidad: 10
        }))

        expect(errorOrderDishesData).toEqual([])
    })


    test('When some or all parameters are missing', async () => {
        
        //@ts-ignore
        const errorOrderDishesData = await validate(new OrderDishesDTO({
            //orderId: "frty65erf4f-55-6443dd22s", 
            dishId: "53013158-5eb0-4b00-9fe3-d16434ca7382", 
            //cantidad: 10
        }))

        expect(errorOrderDishesData[0]).toBeInstanceOf(ValidationError)
    })


    test('When some or all parameters are missing', async () => {
        
        const errorOrderDishesData = await validate(new OrderDishesDTO({
            orderId: "frty65erf4f-55-6443dd22s", 
            dishId: "53013158-5eb0-4b00-9fe3-d16434ca7382", 
            //@ts-ignore
            cantidad: "10"
        }))

        expect(errorOrderDishesData[0]).toBeInstanceOf(ValidationError)
    })

})