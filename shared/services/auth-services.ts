import axios from "axios";
import { TTokenResponse } from "../types/auth";
import { useAuthStore } from "../stores/auth-store";
import { AUTH_FLAG_COOKIE_NAME } from "../constants/auth";

const isBrowser = () => typeof window !== 'undefined';

const getLocalSession = () => useAuthStore.getState();

const getCookie = (name: string) => {
    if (!isBrowser())
        return null;

    return document.cookie
        .split("; ")
        .find(cookie => cookie.startsWith(`${name}=`))
        ?.split("=")[1] ?? null;
};

const saveSession = (session: TTokenResponse) => {
    const { setSession } = getLocalSession();

    setSession({
        accessToken: session.access_token,
        expiresAt: Date.now() + session.expires_in * 1000,
        fullName: session.full_name,
        roles: session.roles,
    });
};

const clearLocalSession = () => {
    getLocalSession().clearSession();

    if (!isBrowser())
        return;

    for (const key of Object.keys(sessionStorage)) {
        if (key.startsWith("kc_exchange_"))
            sessionStorage.removeItem(key);
    }
}

export const AuthService = {

    getLocalSession,

    getCookie,

    hasAuthFlag: () => {
        return getCookie(AUTH_FLAG_COOKIE_NAME) === "true"
    },

    clearLocalSession,

    async exchangeCodeForToken(code: string, redirectUri: string) {
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

            saveSession(res.data);
        }
        catch (error) {
            sessionStorage.removeItem(exchangeKey);
            throw error;
        }
    },

    async refreshToken() {
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

        saveSession(res.data);
    },

    async logout() {
        const { accessToken } = getLocalSession();

        try {
            await axios.post(
                'api/auth/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );
        }
        finally {
            clearLocalSession();
        }
    },
}