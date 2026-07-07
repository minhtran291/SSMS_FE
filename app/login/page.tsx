'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { keycloak } from "@/lib/keycloak";
import { AuthService } from "@/shared/services/auth-services";
import { Suspense, useEffect } from "react";
import MySpin from "@/components/ant-custom/my-spin";

function LoginContet() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isAuthenticated } = AuthService();
    const redirectUrl = searchParams.get('redirect') || '/dashboard';

    useEffect(() => {
        if (isAuthenticated()) {
            router.replace(redirectUrl);
            return;
        }
        // console.log(keycloak.authorizeUrl);

        const keycloakLoginUrl = new URL(keycloak.authorizeUrl);

        keycloakLoginUrl.searchParams.set("client_id", keycloak.clientId);
        keycloakLoginUrl.searchParams.set("redirect_uri", keycloak.redirectUri);
        keycloakLoginUrl.searchParams.set("response_type", "code");
        keycloakLoginUrl.searchParams.set("scope", "openid profile email");
        keycloakLoginUrl.searchParams.set("state", redirectUrl);

        window.location.href = keycloakLoginUrl.toString();

        // console.log(keycloakLoginUrl.toString());

    }, [router, redirectUrl]);

    return (
        <MySpin description="Đang tải cấu hình bảo mật..." fullscreen />
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={<MySpin description="Đang chuẩn bị trang đăng nhập..." fullscreen />}>
            <LoginContet />
        </Suspense>
    )
}