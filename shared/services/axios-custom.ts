import { API_BASE_URL } from '@/lib/api';
import axios from 'axios';

const api = axios.create({
    baseURL: API_BASE_URL,
    paramsSerializer: {
        indexes: null
    }
})

export default api;