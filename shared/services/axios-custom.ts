import { API_BASE_URL } from '@/lib/api';
import axios from 'axios';
import { AuthService } from './auth-services';
import { ACCESS_TOKEN_REFRESH_BUFFER_MS } from "../constants/auth";

const api = axios.create({
    baseURL: API_BASE_URL,
    paramsSerializer: {
        indexes: null
    }
});

api.interceptors.request.use(async config => {
    const { refreshToken, clearLocalSession, getLocalSession, hasAuthFlag } = AuthService;

    if (!hasAuthFlag())
        return config;

    // neu da dang nhap    
    let { accessToken, expiresAt } = getLocalSession();

    // check loi neu accessToken hay expiresAt null

    if (accessToken === null || expiresAt === null) {
        clearLocalSession();

        window.location.replace("/login");

        return Promise.reject(new Error("Missing access token."));
    }

    if (Date.now() >= expiresAt - ACCESS_TOKEN_REFRESH_BUFFER_MS) {
        try {
            await refreshToken();

            accessToken = getLocalSession().accessToken;
        } catch (error) {
            // console.error("Pre-request refresh failed:", error);

            clearLocalSession();

            window.location.replace("/login");

            return Promise.reject(error);
        }
    }
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
        if (
            error.response?.status === 401 &&
            AuthService.hasAuthFlag()
        ) {
            AuthService.clearLocalSession();

            window.location.replace("/login");
        }

        return Promise.reject(error);
    }
);

export default api;