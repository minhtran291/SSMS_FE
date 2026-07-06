import axios from "axios";
import { TTokenResponse } from "../types/auth";
import api from "./axios-custom";

const SESSION_STORAGE_KEY = 'session_data';

const isBrowser = () => typeof window !== 'undefined';

export const AuthService = () => {

    const setSession = (data: TTokenResponse): void => {
        if (isBrowser()) {
            sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data));
        }
    }

    const getSession = (): TTokenResponse | null => {
        if (!isBrowser()) return null;

        const sessionData = sessionStorage.getItem(SESSION_STORAGE_KEY);

        return sessionData ? (JSON.parse(sessionData) as TTokenResponse) : null
    }

    const getAccessToken = (): string | null => {
        return getSession()?.access_token ?? null;
    }

    const isAuthenticated = (): boolean => {
        return !!getAccessToken();
    }

    const setLogout = () => {
        if (isBrowser()) {
            sessionStorage.removeItem(SESSION_STORAGE_KEY);
            Object.keys(sessionStorage).forEach((key) => {
                if (key.startsWith('kc_exchange_'))
                    sessionStorage.removeItem(key);
            })
        }
    }

    const exchangeCodeForToken = async (code: string, redirectUri: string) => {
        if (!isBrowser()) {
            throw new Error('This function can only be called in a browser environment.');
        }

        const exchangeKey = `kc_exchange_${code}`;

        if (sessionStorage.getItem(exchangeKey) === '1') {
            return;
        }

        sessionStorage.setItem(exchangeKey, '1');

        try {
            const res = await axios.post(
                'api/auth/callback',
                { code, redirectUri },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }
            );

            if (!res)
                throw new Error('Failed to exchange token via BFF');

            const sessionData: TTokenResponse = res.data;

            setSession(sessionData);

        } catch (e) {
            sessionStorage.removeItem(exchangeKey);
            throw e;
        }
    }

    const refreshToken = async (): Promise<string | null> => {
        try {
            const res = await axios.post(
                'api/auth/refresh',
                {},
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }
            );

            if (!res) {
                setLogout();
                return null;
            }

            const newSessionData: TTokenResponse = res.data;
            setSession(newSessionData);
            return newSessionData.access_token ?? null;
        }
        catch (error) {
            setLogout();
            return null;
        }
    }

    const logout = async () => {
        try {
            await api.post('api/auth/logout');

            await axios.post(
                'api/auth/logout',
                {},
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }
            );
        } catch (e) {
            console.error('Lỗi gọi API logout nội bộ', e);
        }
        finally {
            setLogout();
            window.location.assign('/');
            return;
        }
    }

    return {
        exchangeCodeForToken,
        refreshToken,
        logout,
        getSession,
        setSession,
        setLogout,
        getAccessToken,
        isAuthenticated
    }
}