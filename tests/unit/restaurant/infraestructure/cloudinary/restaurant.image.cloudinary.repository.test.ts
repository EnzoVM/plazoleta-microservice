import RestaurantImagenCloudinaryRepository from "../../../../../src/core/restaurant/infraestructure/cloudinary/restaurant.image.cloudinary.repository"
import cloudinary from "../../../../../src/sdks/cloudinary.sdk"

jest.mock('../../../../../src/sdks/cloudinary.sdk', () => ({
    uploader: {
      upload: jest.fn().mockImplementationOnce((path) => ({ secure_url: 'http://mocked_image_url' })),
    }
}));

describe('Generate image dish', () => {

    test('Generate image successfully', async () => {
        const restaurantImagenCloudinaryRepository = new RestaurantImagenCloudinaryRepository()
        const restaurantImage = await restaurantImagenCloudinaryRepository.uploadImage('http://imagemock.com')

        expect(restaurantImage).toBe('http://mocked_image_url')
    })

})