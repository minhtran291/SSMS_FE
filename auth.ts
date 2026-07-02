// import { NextAuthOptions } from "next-auth";
// import KeycloakProvider from "next-auth/providers/keycloak";

// export const authOptions: NextAuthOptions = {
//     providers: [
//         KeycloakProvider({
//             clientId: process.env.KEYCLOAK_CLIENT_ID!,
//             clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
//             issuer: process.env.KEYCLOAK_ISSUER,
//         }),
//     ],

//     callbacks: {
//         async jwt({ token, account }) {
//             // if (account) {
//             //     console.log("===== LOGIN SUCCESS =====");
//             //     console.log(account);
//             //     console.log(profile);
//             // }

//             // console.log("account", account);
//             //console.log("profile", profile);
//             // console.log("token", token);

//             if (account) {
//                 token.accessToken = account.access_token;
//                 token.refreshToken = account.refresh_token;
//                 token.idToken = account.id_token;
//                 token.expiresAt = account.expires_at;
//             }

//             return token;
//         },

//         async session({ session }) {
//             // console.log("===== SESSION CALLBACK =====");
//             // console.log(session);
//             // console.log(token);

//             return session;
//         }
//     }
// };