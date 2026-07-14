import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const REFRESH_TOKEN_COOKIE_NAME = 'refresh_token'
const AUTH_FLAG_COOKIE_NAME = 'auth_flag'

export async function POST(request: NextRequest) {
    try {
        const authrization = request.headers.get("authorization");

        await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
            {},
            {
                headers: {
                    Authorization: authrization,
                }
            }
        );

        const response = NextResponse.json({
            message: "Logged out"
        });

        response.cookies.delete(REFRESH_TOKEN_COOKIE_NAME);
        response.cookies.delete(AUTH_FLAG_COOKIE_NAME);

        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            return NextResponse.json(
                {
                    error: error.message
                },
                {
                    status: error.status
                }
            );
        }

        const response = NextResponse.json(
            {
                error: `Logout failed at logout route, ${error}`
            },
            {
                status: 500
            }
        );

        return response;
    }
}