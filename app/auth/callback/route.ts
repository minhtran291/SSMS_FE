import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code");

    if (!code) {
        return NextResponse.json(
            {
                error: "Authorization code not found."
            },
            {
                status: 400
            }
        );
    }

    console.log(code);
    return NextResponse.json({
        code
    });
}