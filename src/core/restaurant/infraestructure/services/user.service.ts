import axios from 'axios'

const serviceUrl = 'http://localhost:3000'

export const getRoleIdUserByIdentification = async (userId: string) => {
    try {
        const response = await axios.get(`${serviceUrl}/api/v1/user/getRoleId/${userId}`)

        const {status, message, data} = response.data

        return {status, message, data}

    } catch (error:any) {
        
        return {status: 'fail', message: error.message}
    }
}

