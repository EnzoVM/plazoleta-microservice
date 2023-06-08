import DishImagenCloudinaryRepository from "../../../../../src/core/dish/infraestructure/cloudinary/dish.image.cloudinary.repository"
import cloudinary from "../../../../../src/sdks/cloudinary.sdk"

jest.mock('../../../../../src/sdks/cloudinary.sdk', () => ({
    uploader: {
      upload: jest.fn().mockImplementationOnce((path) => ({ secure_url: 'http://mocked_image_url' })),
    }
}));

describe('Generate image dish', () => {

    test('Generate image successfully', async () => {

        const dishImagenCloudinaryRepository = new DishImagenCloudinaryRepository()
        const imageDish = await dishImagenCloudinaryRepository.uploadImage('http://imagemock.com')

        expect(imageDish).toBe('http://mocked_image_url')
    })

})