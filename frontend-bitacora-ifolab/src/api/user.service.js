import axios from "axios";
const URL = process.env.NEXT_PUBLIC_SERVER_URL 

const apiPost = async (endpoint, payload, token) => {
    try {
        const response = await axios.post(`${URL}${endpoint}`,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        throw error?.response?.data || { message:'Error de Conexión' } 
    }
}

const apiGet = async (endpoint,token) => {
    try{
        const response = await axios.get(`${URL}${endpoint}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return response;
    }catch(error){
        console.log(error)
        throw error.response.data || { message:'Error de Conexión'}        
    }

}

export { apiPost, apiGet }