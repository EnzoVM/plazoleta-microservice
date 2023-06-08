import axios from 'axios'
import RestaurantServiceRepository from '../../domain/restaurant.service.repository'

const serviceUrl = process.env.API_USER

export default class UserServiceRepository implements RestaurantServiceRepository{
    
    async getRoleByUserId (userId: string): Promise<{ status: string; message: string; data?: undefined }> {
        try {
            const response = await axios.get(`${serviceUrl}/api/v1/roles/${userId}`)
    
            const {status, message, data} = response.data
    
            return {status, message, data}
    
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}