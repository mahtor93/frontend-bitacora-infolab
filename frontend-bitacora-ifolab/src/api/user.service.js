import axios from "axios";
const URL = process.env.NEXT_PUBLIC_SERVER_ALT_URL 
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
        return (`API POST ERROR (${endpoint})`, error);

    }
}

const apiGet = async (endpoint,token) => {
    return await axios.get(`${URL}${endpoint}`, {
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
}

export { apiPost, apiGet }