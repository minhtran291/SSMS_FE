import axios from "axios";
import { TTokenResponse } from "../types/auth";
import api from "./axios-custom";
import { useAuthStore } from "../stores/auth-store";

const SESSION_STORAGE_KEY = 'session_data';

const isBrowser = () => typeof window !== 'undefined';

export const AuthService = () => {

    // const setSession = (data: TTokenResponse): void => {
    //     if (isBrowser()) {
    //         sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data));
    //     }
    // }

    // const getSession = (): TTokenResponse | null => {
    //     if (!isBrowser()) return null;

    //     const sessionData = sessionStorage.getItem(SESSION_STORAGE_KEY);

    //     return sessionData ? (JSON.parse(sessionData) as TTokenResponse) : null
    // }

    // const getAccessToken = (): string | null => {
    //     return getSession()?.access_token ?? null;
    // }

    // const isAuthenticated = (): boolean => {
    //     return !!getAccessToken();
    // }

    const clearLocalSession = () => {
        useAuthStore.getState().clearSession();

        if (!isBrowser())
            return;

        for (const key of Object.keys(sessionStorage)) {
            if (key.startsWith("kc_exchange_"))
                sessionStorage.removeItem(key);
        }
    }

    const exchangeCodeForToken = async (code: string, redirectUri: string) => {
        if (!isBrowser())
            throw new Error('This function can only be called in a browser environment.');

        const exchangeKey = `kc_exchange_${code}`;

        if (sessionStorage.getItem(exchangeKey) === '1')
            return;

        sessionStorage.setItem(exchangeKey, '1');

        try {
            const res = await axios.post(
                'api/auth/callback',
                { code, redirectUri },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }
            );

            const sessionData: TTokenResponse = res.data;

            const { setSession } = useAuthStore.getState();

            setSession({
                accessToken: sessionData.access_token,
                expiresAt: Date.now() + sessionData.expires_in * 1000,
                // firstName: sessionData.first_name,
                // lastName: sessionData.last_name,
                fullName: sessionData.full_name,
                roles: sessionData.roles
            });

        } catch (error) {
            sessionStorage.removeItem(exchangeKey);

            if (axios.isAxiosError(error))
                throw new Error(error.response?.data?.error);

            throw error;
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
                // setLogout();
                return null;
            }

            const newSessionData: TTokenResponse = res.data;
            // setSession(newSessionData);
            return newSessionData.access_token ?? null;
        }
        catch (error) {
            // setLogout();
            return null;
        }
    }

    const logout = async () => {
        const accessToken = useAuthStore.getState().accessToken;

        await axios.post(
            'api/auth/logout',
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        clearLocalSession();
    }

    return {
        exchangeCodeForToken,
        refreshToken,
        logout,
        // getSession,
        // setSession,
        clearLocalSession,
        // getAccessToken,
        // isAuthenticated
    }
}