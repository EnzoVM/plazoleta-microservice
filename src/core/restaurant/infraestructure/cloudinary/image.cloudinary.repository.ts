import cloudinary from "../../../../sdks/cloudinary.sdk"
import ImageUploadRepository from "../../domain/image.upload.repository"

export default class ImagenCloudinaryRepository implements ImageUploadRepository {
    
    async uploadImage (path: string): Promise<string> {
        try {
            const response = await cloudinary.uploader.upload(path)
            return response.secure_url

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}