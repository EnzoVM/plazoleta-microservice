import axios from "axios";
import OrderServiceRepository from "../../domain/order.service.repository";

export default class MessageServiceRepository implements OrderServiceRepository{
    
    async sendMessage (body: string, to: string): Promise<string> {
        try {
            const response = await axios.post(`${process.env.API_MESSAGE}`, {
                body,
                to
            })
            
            return response.data.message

        } catch (error: any) {
            throw new Error(error.message)
        }
    }

}