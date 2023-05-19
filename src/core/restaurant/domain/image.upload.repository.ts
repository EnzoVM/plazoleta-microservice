

export default interface ImageUploadRepository {

    uploadImage: (path: string) => Promise<string>
}