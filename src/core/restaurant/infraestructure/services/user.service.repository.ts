import axios from 'axios'
import RestaurantServiceRepository from '../../domain/restaurant.service.repository'

export default class UserServiceRepository implements RestaurantServiceRepository{
    
    async getRoleByUserId (userId: string): Promise<{ status: string; message: string; data?: undefined }> {
        try {
            const response = await axios.get(`${process.env.API_GET_ROLE_USER}/${userId}`)
    
            const {status, message, data} = response.data
    
            return {status, message, data}
    
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}