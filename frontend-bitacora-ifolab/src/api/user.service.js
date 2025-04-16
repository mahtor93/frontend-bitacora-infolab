import axios from "axios";
const URL = "152.74.180.135:3000/api"

const apiPost = async (endpoint, payload) => {
    try {
        const response = await axios.post(`http://152.74.180.135:3000/api${endpoint}`,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        return response;
    } catch (error) {
        return (`API POST ERROR (${endpoint})`, error);
        throw error;
    }
}

const apiGet = async (endpoint) => {
    return await axios.get()
}

export { apiPost, apiGet }