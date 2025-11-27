import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const createUser = async (data) => {
    const response = await api.post('/user', data);
    return response.data;
};

export const login = async (data) => {
    const response = await api.post('/login', data);
    return response.data;
};

export default api;
