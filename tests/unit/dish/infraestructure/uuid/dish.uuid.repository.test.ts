import DishUuidRepository from "../../../../../src/core/dish/infraestructure/uuid/dish.uuid.repository"
import { v4 as uuid } from 'uuid'

jest.mock("uuid")

describe('Generate dish Id', () => {

    test('Generate Id successfully', () => {
        (uuid as jest.Mock).mockReturnValueOnce('efffef55665g5-6y5y665g-5g')

        const dishUuidRepository = new DishUuidRepository()
        const generateDishId = dishUuidRepository.generateDishId()
        
        expect(generateDishId).toBe('efffef55665g5-6y5y665g-5g')
    })
})