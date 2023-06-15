import DishPrismaRepository from "../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository"
import ListDishesByRestaurantId from "../../../../src/core/dish/application/list.dishes.by.restaurantId"
import { arrayOfDishes } from "../../../helpers/dish/list.dishes.helpers"

jest.mock("../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository")

describe('List dishes by restaurant id', () => {

    let dishPrismaRepository
    let listDishesByRestaurantId: ListDishesByRestaurantId

    beforeEach(() => {
      dishPrismaRepository = new DishPrismaRepository()
      listDishesByRestaurantId = new ListDishesByRestaurantId(dishPrismaRepository)
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })
    
    
    test('List all dishes by Category and Items per Page successfully', async () => {
        const spyListDish = jest.spyOn(dishPrismaRepository, 'listDishesByRestaurantId')
        
        spyListDish.mockResolvedValue(arrayOfDishes)

        const listDishes = await listDishesByRestaurantId.listDishes(1, 2, 'de891602-ef54-46bc-9356-9e4bf666defc')

        expect(listDishes[0].dishes).toHaveLength(2)
        expect(listDishes[1].dishes).toHaveLength(2)
        expect(listDishes[2].dishes).toHaveLength(2)
    })


    test('When there is an error with list dishes by restaurant id', async () => {
      const spyListDish = jest.spyOn(dishPrismaRepository, 'listDishesByRestaurantId')
      
      spyListDish.mockResolvedValue(null)

      await expect(listDishesByRestaurantId.listDishes(1, 2, 'de891602-ef54-46bc-9356-9e4bf666defc')).rejects.toBeInstanceOf(Error)
    })


    test('When there is an error with list dishes by restaurant id', async () => {
      const spyListDish = jest.spyOn(dishPrismaRepository, 'listDishesByRestaurantId')
      
      spyListDish.mockRejectedValue(new Error('ERROR IN LIST DISHES BY RESTAURANT ID'))

      await expect(listDishesByRestaurantId.listDishes(1, 2, 'de891602-ef54-46bc-9356-9e4bf666defc')).rejects.toBeInstanceOf(Error)
    })
})