import axios from "axios";
const URL = "http://152.74.180.135:3000/api"

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