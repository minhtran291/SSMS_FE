import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { REFRESH_TOKEN_COOKIE_NAME, AUTH_FLAG_COOKIE_NAME } from "@/shared/constants/auth";

export async function POST(request: NextRequest) {
    try {
        const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

        if (!refreshToken) {
            return NextResponse.json(
                {
                    error: "Refresh token không tồn tại."
                },
                {
                    status: 401
                }
            );
        }

        const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
            {
                refreshToken
            }
        );

        const { refresh_token, refresh_token_expires_in, ...publicData } = data;

        const response = NextResponse.json(publicData);

        response.cookies.set(REFRESH_TOKEN_COOKIE_NAME, refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: refresh_token_expires_in,
            path: "/"
        });

        response.cookies.set(AUTH_FLAG_COOKIE_NAME, 'true', {
            secure: false,
            path: "/",
            maxAge: refresh_token_expires_in,
            sameSite: "lax"
        });

        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            const response = NextResponse.json(
                {
                    error: error.message
                },
                {
                    status: error.status
                }
            );

            if (error.status === 401) {
                response.cookies.delete(REFRESH_TOKEN_COOKIE_NAME);
                response.cookies.delete(AUTH_FLAG_COOKIE_NAME);
            }

            return response;
        }

        return NextResponse.json(
            {
                error: `Internal Server Error ${error}`
            },
            {
                status: 500
            }
        )
    }
}