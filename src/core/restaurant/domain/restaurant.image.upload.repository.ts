
export default interface RestaurantImageUploadRepository {
    uploadImage: (path: string) => Promise<string>
}