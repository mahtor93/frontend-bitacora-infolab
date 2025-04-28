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

const apiGet = async (endpoint, query = {}, token) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
  
      // Si query tiene algo, lo agregamos en config.params
      if (Object.keys(query).length > 0) {
        config.params = query;
      }
  
      const response = await axios.get(`${URL}${endpoint}`, config);
  
      return response;
      
    } catch (error) {
      throw error.response?.data || { message: 'Error de Conexión' };
    }
  };

export { apiPost, apiGet }