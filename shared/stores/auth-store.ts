import { create } from "zustand";

type AuthState = {
    accessToken: string | null;
    expiresAt: number | null;
    fullName: string | null;
    roles: string[];

    setSession: (payload: {
        accessToken: string;
        expiresAt: number;
        fullName: string;
        roles: string[];
    }) => void;

    clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    expiresAt: null,
    fullName: null,
    roles: [],

    setSession: ({ accessToken, expiresAt, fullName, roles }) =>
        set({
            accessToken,
            expiresAt,
            fullName,
            roles
        }),

    clearSession: () =>
        set({
            accessToken: null,
            expiresAt: null,
            fullName: null,
            roles: []
        })
}));