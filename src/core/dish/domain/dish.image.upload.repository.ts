
export default interface DishImageUploadRepository {
    uploadImage: (path: string) => Promise<string>
}