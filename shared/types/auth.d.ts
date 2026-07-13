export type TTokenResponse = {
    access_token: string;
    expires_in: number;
    // refresh_expires_in?: number;
    // refresh_token?: string;
    token_type: string;
    roles: string[];
    // first_name: string;
    // last_name: string;
    full_name: string;
}