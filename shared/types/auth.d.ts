export type TTokenResponse = {
    access_token: string;
    expires_in: number;
    // refresh_expires_in?: number;
    // refresh_token?: string;
    token_type: string;
    roles: string[];
    full_name: string;
}