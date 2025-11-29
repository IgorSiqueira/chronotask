import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        console.log('Token do localStorage:', token ? `${token.substring(0, 20)}...` : 'não encontrado');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Header Authorization adicionado:', config.headers.Authorization.substring(0, 30) + '...');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado ou inválido
            console.log('Token expirado ou inválido, redirecionando para login...');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userFullName');
            localStorage.removeItem('characterCustomization');

            // Redirecionar para login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const createUser = async (data) => {
    const response = await api.post('/user', data);
    return response.data;
};

export const login = async (data) => {
    const response = await api.post('/login', data);
    return response.data;
};

export const createCharacter = async (data) => {
    const response = await api.post('/character', data);
    return response.data;
};

export const getUserCharacter = async () => {
    const response = await api.get('/user/character');
    return response.data;
};

export default api;
