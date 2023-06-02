import InsertDish from "../../../../src/core/dish/application/insert.dish"
import DishPrismaRepository from "../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository"
import ImagenCloudinaryRepository from "../../../../src/core/restaurant/infraestructure/cloudinary/image.cloudinary.repository"
import DishUuidRepository from "../../../../src/core/dish/infraestructure/uuid/dish.uuid.repository"

jest.mock("../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository")
jest.mock("../../../../src/core/restaurant/infraestructure/cloudinary/image.cloudinary.repository")
jest.mock("../../../../src/core/dish/infraestructure/uuid/dish.uuid.repository")

describe('Insert a Dish', () => {
    
    test('Insert a dish successfully', async () => {
        const dishPrismaRepository = new DishPrismaRepository()
        const imagenCloudinaryRepository = new ImagenCloudinaryRepository()
        const dishUuidRepository = new DishUuidRepository()

        const spyInsertDish = jest.spyOn(dishPrismaRepository, 'insertDish')
        const spyImagenCloudDish = jest.spyOn(imagenCloudinaryRepository, 'uploadImage')
        const spyGenerateDishId = jest.spyOn(dishUuidRepository, 'generateDishId')

        spyInsertDish.mockResolvedValueOnce({
            dishId: 'i34543ddde-2o3ennfn2o424-d2d32d2d',      
            dishName: 'Plato creado mock',
            categoryId: '2000001',
            dishDescription: 'Este es un plato creado para pruebas',       
            dishPrice: 100,
            restaurantId: '1a2a730e-ee3c-4d4f-9f19-2cab34838950',
            dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685488920/eiokfpirsg3rpw2x2ekz.jpg',
            dishActive: true
        })
        
        spyGenerateDishId.mockReturnValueOnce('i34543ddde-2o3ennfn2o424-d2d32d2d')

        spyImagenCloudDish.mockResolvedValue('https://res.cloudinary.com/enzogvm/image/upload/v1685488920/eiokfpirsg3rpw2x2ekz.jpg')

        const insertDish = new InsertDish(dishPrismaRepository, imagenCloudinaryRepository, dishUuidRepository)
        //@ts-ignore
        const dishSaved = await insertDish.createDish('2000001', 'Este es un plato creado para pruebas', 100, '1a2a730e-ee3c-4d4f-9f19-2cab34838950', 'https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1')

        expect(dishSaved.dishId).toStrictEqual('i34543ddde-2o3ennfn2o424-d2d32d2d')
        expect(dishSaved.dishName).toStrictEqual('Plato creado mock')
    })

})