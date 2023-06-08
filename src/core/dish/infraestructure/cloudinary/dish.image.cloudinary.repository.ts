import cloudinary from "../../../../sdks/cloudinary.sdk"
import DishImageUploadRepository from "../../domain/dish.image.upload.repository"

export default class DishImagenCloudinaryRepository implements DishImageUploadRepository {
    
    async uploadImage (path: string): Promise<string> {
        try {
            const response = await cloudinary.uploader.upload(path)
            return response.secure_url

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}