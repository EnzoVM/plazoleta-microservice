import cloudinary from "../../../../sdks/cloudinary.sdk"
import RestaurantImageUploadRepository from "../../domain/restaurant.image.upload.repository"

export default class RestaurantImagenCloudinaryRepository implements RestaurantImageUploadRepository {
    
    async uploadImage (path: string): Promise<string> {
        try {
            const response = await cloudinary.uploader.upload(path)
            return response.secure_url

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}