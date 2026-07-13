import { create } from "zustand";

type AuthState = {
    accessToken: string | null;
    expiresAt: number | null;
    // firstName: string | null;
    // lastName: string | null;
    fullName: string | null;
    roles: string[];

    setSession: (payload: {
        accessToken: string;
        expiresAt: number;
        // firstName: string;
        // lastName: string;
        fullName: string;
        roles: string[];
    }) => void;

    clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    expiresAt: null,
    // firstName: null,
    // lastName: null,
    fullName: null,
    roles: [],

    setSession: ({ accessToken, expiresAt, fullName, roles }) =>
        set({
            accessToken,
            expiresAt,
            // firstName,
            // lastName,
            fullName,
            roles
        }),

    clearSession: () =>
        set({
            accessToken: null,
            expiresAt: null,
            // firstName: null,
            // lastName: null,
            fullName: null,
            roles: []
        })
}));