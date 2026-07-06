'use client';

import MySpin from "@/components/ant-custom/my-spin";
import { AuthService } from "@/shared/services/auth-services";
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { exchangeCodeForToken } = useMemo(() => AuthService(), []);
    const [error, setError] = useState<string | null>(null);
    const code = searchParams.get('code');
    const state = searchParams.get('state') || '/dashboard';

    useEffect(() => {
        if (!code) {
            setError('Không tìm thấy authorization code. Vui lòng thử đăng nhập lại.');
            return;
        }

        const redirectUri = process.env.NEXT_PUBLIC_CALLBACK_URL!;

        exchangeCodeForToken(code, redirectUri)
            .then(() => router.push(state))
            .catch((err) => {
                console.error('Lỗi khi trao đổi token:', err);
                setError(err.message || 'Đã xảy ra lỗi không mong muốn.');
            })
    }, [code, state, router, exchangeCodeForToken])

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center space-y-4">
                    <CloseCircleOutlined className="text-red-500 text-6xl" />
                    <h1 className="text-2xl font-bold text-gray-800 m-0">Xác thực thất bại</h1>
                    <p className="text-gray-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                        {error}
                    </p>
                    <div className="pt-4">
                        <Button
                            type="primary"
                            danger
                            size="large"
                            className="w-full"
                            onClick={() => router.push('/login')}
                        >
                            Thử đăng nhập lại
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <MySpin
                description="Đang thiếp lập phiên làm việc..."
                fullscreen />
        </div>
    )
}

export default function CallbackPage() {
    return (
        <Suspense>
            <CallbackContent />
        </Suspense>
    )
}