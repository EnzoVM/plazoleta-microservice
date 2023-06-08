import InsertDish from "../../../../src/core/dish/application/insert.dish"
import DishPrismaRepository from "../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository"
import DishImagenCloudinaryRepository from "../../../../src/core/dish/infraestructure/cloudinary/dish.image.cloudinary.repository"
import DishUuidRepository from "../../../../src/core/dish/infraestructure/uuid/dish.uuid.repository"

jest.mock("../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository")
jest.mock("../../../../src/core/dish/infraestructure/cloudinary/dish.image.cloudinary.repository")
jest.mock("../../../../src/core/dish/infraestructure/uuid/dish.uuid.repository")

describe('Insert a Dish', () => {
    
    test('Insert a dish successfully', async () => {
        const dishPrismaRepository = new DishPrismaRepository()
        const dishImagenCloudinaryRepository = new DishImagenCloudinaryRepository()
        const dishUuidRepository = new DishUuidRepository()

        const spyInsertDish = jest.spyOn(dishPrismaRepository, 'insertDish')
        const spyImagenCloudDish = jest.spyOn(dishImagenCloudinaryRepository, 'uploadImage')
        const spyGenerateDishId = jest.spyOn(dishUuidRepository, 'generateDishId')

        spyGenerateDishId.mockReturnValueOnce('i34543ddde-2o3ennfn2o424-d2d32d2d')
        spyImagenCloudDish.mockResolvedValue('https://res.cloudinary.com/enzogvm/image/upload/v1685488920/eiokfpirsg3rpw2x2ekz.jpg')
        spyInsertDish.mockResolvedValueOnce({
            dishId: dishUuidRepository.generateDishId(),      
            dishName: 'Plato creado mock',
            categoryId: '2000001',
            dishDescription: 'Este es un plato creado para pruebas',       
            dishPrice: 100,
            restaurantId: '1a2a730e-ee3c-4d4f-9f19-2cab34838950',
            dishUrlImage: await dishImagenCloudinaryRepository.uploadImage('https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1'),
            dishActive: true
        })
        
        const insertDish = new InsertDish(dishPrismaRepository, dishImagenCloudinaryRepository, dishUuidRepository)
        const dishSaved = await insertDish.createDish('Plato creado mock', '2000001', 'Este es un plato creado para pruebas', 100, '1a2a730e-ee3c-4d4f-9f19-2cab34838950', 'https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1')

        expect(dishSaved.dishId).toStrictEqual('i34543ddde-2o3ennfn2o424-d2d32d2d')
        expect(dishSaved.dishName).toStrictEqual('Plato creado mock')
    })


    test('When some or all parameters are missing', async () => {
        const dishPrismaRepository = new DishPrismaRepository()
        const dishImagenCloudinaryRepository = new DishImagenCloudinaryRepository()
        const dishUuidRepository = new DishUuidRepository()

        const insertDish = new InsertDish(dishPrismaRepository, dishImagenCloudinaryRepository, dishUuidRepository)
        
        //Name and description are missing
        //@ts-ignore
        await expect(insertDish.createDish('2000001', 100, '1a2a730e-ee3c-4d4f-9f19-2cab34838950', 'https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1')).rejects.toBeInstanceOf(Error)
    })


    test('When some or all parameters are missing', async () => {
        const dishPrismaRepository = new DishPrismaRepository()
        const dishImagenCloudinaryRepository = new DishImagenCloudinaryRepository()
        const dishUuidRepository = new DishUuidRepository()

        const insertDish = new InsertDish(dishPrismaRepository, dishImagenCloudinaryRepository, dishUuidRepository)
        
        //Dish price must be a number
        //@ts-ignore
        await expect(insertDish.createDish('Plato creado mock', '2000001', 'Este es un plato creado para pruebas', "100", '1a2a730e-ee3c-4d4f-9f19-2cab34838950', 'https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1')).rejects.toBeInstanceOf(Error)
    })


    test('when there is an error in the generation of the dish id', async () => {
        const dishPrismaRepository = new DishPrismaRepository()
        const dishImagenCloudinaryRepository = new DishImagenCloudinaryRepository()
        const dishUuidRepository = new DishUuidRepository()

        const spyInsertDish = jest.spyOn(dishPrismaRepository, 'insertDish')
        const spyImagenCloudDish = jest.spyOn(dishImagenCloudinaryRepository, 'uploadImage')
        const spyGenerateDishId = jest.spyOn(dishUuidRepository, 'generateDishId')

        spyGenerateDishId.mockImplementation(() => {
            throw new Error('ERROR IN DISH ID')
        })
        spyImagenCloudDish.mockResolvedValue('https://res.cloudinary.com/enzogvm/image/upload/v1685488920/eiokfpirsg3rpw2x2ekz.jpg')
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
        
        const insertDish = new InsertDish(dishPrismaRepository, dishImagenCloudinaryRepository, dishUuidRepository)

        await expect(insertDish.createDish('Plato creado mock', '2000001', 'Este es un plato creado para pruebas', 100, '1a2a730e-ee3c-4d4f-9f19-2cab34838950', 'https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1')).rejects.toBeInstanceOf(Error)
    })


    test('when there is an error in the generation of the image url', async () => {
        const dishPrismaRepository = new DishPrismaRepository()
        const dishImagenCloudinaryRepository = new DishImagenCloudinaryRepository()
        const dishUuidRepository = new DishUuidRepository()

        const spyInsertDish = jest.spyOn(dishPrismaRepository, 'insertDish')
        const spyImagenCloudDish = jest.spyOn(dishImagenCloudinaryRepository, 'uploadImage')
        const spyGenerateDishId = jest.spyOn(dishUuidRepository, 'generateDishId')

        spyGenerateDishId.mockReturnValueOnce('i34543ddde-2o3ennfn2o424-d2d32d2d')
        spyImagenCloudDish.mockRejectedValue(new Error('ERROR IN DISH IMAGE URL'))
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
        
        const insertDish = new InsertDish(dishPrismaRepository, dishImagenCloudinaryRepository, dishUuidRepository)

        await expect(insertDish.createDish('Plato creado mock', '2000001', 'Este es un plato creado para pruebas', 100, '1a2a730e-ee3c-4d4f-9f19-2cab34838950', 'https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1')).rejects.toBeInstanceOf(Error)
    })


    test('when there is an error when saving dish data', async () => {
        const dishPrismaRepository = new DishPrismaRepository()
        const dishImagenCloudinaryRepository = new DishImagenCloudinaryRepository()
        const dishUuidRepository = new DishUuidRepository()

        const spyInsertDish = jest.spyOn(dishPrismaRepository, 'insertDish')
        const spyImagenCloudDish = jest.spyOn(dishImagenCloudinaryRepository, 'uploadImage')
        const spyGenerateDishId = jest.spyOn(dishUuidRepository, 'generateDishId')

        spyGenerateDishId.mockReturnValueOnce('i34543ddde-2o3ennfn2o424-d2d32d2d')
        spyImagenCloudDish.mockResolvedValue('https://res.cloudinary.com/enzogvm/image/upload/v1685488920/eiokfpirsg3rpw2x2ekz.jpg')
        spyInsertDish.mockRejectedValue(new Error('ERROR IN SAVING DISH DATA'))
        
        const insertDish = new InsertDish(dishPrismaRepository, dishImagenCloudinaryRepository, dishUuidRepository)

        await expect(insertDish.createDish('Plato creado mock', '2000001', 'Este es un plato creado para pruebas', 100, '1a2a730e-ee3c-4d4f-9f19-2cab34838950', 'https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1')).rejects.toBeInstanceOf(Error)
    })
})