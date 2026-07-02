export const keycloak = {
    clientId: process.env.KEYCLOAK_CLIENT_ID!,
    authorizeUrl: `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/auth`,
    logoutUrl: `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`,
    redirectUri: process.env.NEXT_PUBLIC_CALLBACK_URL!,
};