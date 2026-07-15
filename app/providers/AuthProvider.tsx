'use client';

import MySpin from "@/components/ant-custom/my-spin";
import { AuthService } from "@/shared/services/auth-services";
import { useEffect, useState } from "react";

type Props = {
    children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const init = async () => {
            const { hasAuthFlag, refreshToken, clearLocalSession } = AuthService;

            try {
                if (hasAuthFlag())
                    await refreshToken();
            }
            catch (error) {
                console.error("Restore session failed:", error);

                clearLocalSession();
            }
            finally {
                setInitialized(true);
            }
        };
        init();
    }, []);

    if (!initialized)
        return <MySpin description="Đang tải dữ liệu..." fullscreen />

    return children;
}