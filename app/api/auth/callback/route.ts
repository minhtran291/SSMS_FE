import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { REFRESH_TOKEN_COOKIE_NAME, AUTH_FLAG_COOKIE_NAME } from "@/shared/constants/auth";

export async function POST(request: NextRequest) {
    try {
        const { code, redirectUri } = await request.json();

        if (!code || !redirectUri) {
            return NextResponse.json(
                {
                    error: "Authorization code or redirect URI not found.",
                },
                { status: 400 }
            );
        }

        const apiEndpoint = process.env.NEXT_PUBLIC_API_BASE_URL;

        const backendUrl = `${apiEndpoint}/auth/token`;

        const backendRes = await axios.post(
            backendUrl,
            { authorizationCode: code, redirectUri },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const tokenData = backendRes.data;

        // console.log("Token data", tokenData);

        if (!tokenData) {
            console.error('[Callback] Invalid data structure from backend:', tokenData);

            return NextResponse.json(
                { error: 'Invalid data structure received from backend' },
                { status: 500 }
            )
        }

        const { refresh_token, refresh_expires_in, ...publicData } = tokenData;

        const response = NextResponse.json(publicData);

        response.cookies.set(REFRESH_TOKEN_COOKIE_NAME, refresh_token, {
            httpOnly: true,
            secure: false,
            path: '/',
            maxAge: refresh_expires_in,
            sameSite: 'lax'
        });

        response.cookies.set(AUTH_FLAG_COOKIE_NAME, 'true', {
            secure: false,
            path: '/',
            maxAge: refresh_expires_in,
            sameSite: 'lax'
        })

        return response;
    }
    catch (error: any) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                {
                    error: 'Backend returned an error (via Axios)',
                    message: error.response?.data || error.message,
                },
                { status: error.response?.status || 500 }
            )
        }

        return NextResponse.json(
            { error: 'Internal Server Error', message: error.message },
            { status: 500 }
        )
    }
}