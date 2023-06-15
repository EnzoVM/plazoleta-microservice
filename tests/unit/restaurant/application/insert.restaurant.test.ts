import RestaurantPrismaRepository from "../../../../src/core/restaurant/infraestructure/prisma/restaurant.prisma.repository"
import RestaurantImagenCloudinaryRepository from "../../../../src/core/restaurant/infraestructure/cloudinary/restaurant.image.cloudinary.repository"
import RestaurantUuidRepository from "../../../../src/core/restaurant/infraestructure/uuid/restaurant.uuid.repository"
import UserServiceRepository from "../../../../src/core/restaurant/infraestructure/services/user.service.repository"
import InsertRestaurant from "../../../../src/core/restaurant/application/insert.restaurant"

jest.mock("../../../../src/core/restaurant/infraestructure/prisma/restaurant.prisma.repository")
jest.mock("../../../../src/core/restaurant/infraestructure/cloudinary/restaurant.image.cloudinary.repository")
jest.mock("../../../../src/core/restaurant/infraestructure/uuid/restaurant.uuid.repository")
jest.mock("../../../../src/core/restaurant/infraestructure/services/user.service.repository")

describe('Insert a restaurnat', () => {

    let restaurantPrismaRepository
    let restaurantImagenCloudinaryRepository
    let restaurantUuidRepository
    let userServiceRepository
    let insertRestaurant: InsertRestaurant

    beforeEach(() => {
        restaurantPrismaRepository = new RestaurantPrismaRepository()
        restaurantImagenCloudinaryRepository = new RestaurantImagenCloudinaryRepository()
        restaurantUuidRepository = new RestaurantUuidRepository()
        userServiceRepository = new UserServiceRepository()
        insertRestaurant = new InsertRestaurant(
            restaurantPrismaRepository, 
            restaurantImagenCloudinaryRepository, 
            restaurantUuidRepository, 
            userServiceRepository
        )
    })
    
    afterEach(() => {
        jest.restoreAllMocks()
    })


    test('Insert a restaurant successfully', async () => {
        const spyInsertRestaurant = jest.spyOn(restaurantPrismaRepository, 'insertRestaurant')
        const spyImageRestaurant = jest.spyOn(restaurantImagenCloudinaryRepository, 'uploadImage')
        const spyRestaurantId = jest.spyOn(restaurantUuidRepository, 'generateRestaurantId')
        const spyService = jest.spyOn(userServiceRepository, 'getRoleByUserId')

        spyRestaurantId.mockReturnValue('9ae06228-c0db-43aa-b466-45124be8d446')
        spyImageRestaurant.mockResolvedValue('https://res.cloudinary.com/enzogvm/image/upload/v1686239885/citleqas56ibxcvk04lo.jpg')
        spyInsertRestaurant.mockResolvedValue({
            restaurantId: restaurantUuidRepository.generateRestaurantId(),
            restaurantName: "abc",
            restaurantNIT: 987457634,
            restaurantAddress: "Av. Prueba 356",
            restaurantPhoneNumber: "+734526754234",
            restaurantUrlLogo: await restaurantImagenCloudinaryRepository.uploadImage('https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1'),
            ownerId: "7293688879321855281"
        })
        spyService.mockResolvedValue({
            status: 'OK',
            message: 'Message',
            //@ts-ignore
            data: 'Owner'
        })

        const restaurantSaved = await insertRestaurant.createRestaurant('abc', 987457634, 'Av. Prueba 356', '+734526754234', 'https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1', '7293688879321855281')

        expect(restaurantSaved.restaurantId).toBe('9ae06228-c0db-43aa-b466-45124be8d446')
    })


    test('When some or all parameters are missing', async () => {
        //@ts-ignore
        await expect(insertRestaurant.createRestaurant(987457634, '+734526754234', 'https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1', '7293688879321855281')).rejects.toBeInstanceOf(Error)
    })
})