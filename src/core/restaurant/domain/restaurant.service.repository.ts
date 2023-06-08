
export default interface RestaurantServiceRepository {

    getRoleByUserId: (userId: string) => Promise<{status: string, message: string, data?: undefined}>
}