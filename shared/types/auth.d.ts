export type TTokenResponse = {
    access_token?: string;
    expires_in?: number;
    refresh_expires_in?: number;
    refresh_token?: string;
    id_token?: string;
    roles?: string[];
}