'use client'

import { AuthService } from "@/shared/services/auth-services";
import { Avatar, Dropdown, MenuProps } from "antd";
import { LogOut, User } from "lucide-react";
import { useState } from "react";
import MySpin from "../ant-custom/my-spin";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/stores/auth-store";

type UserDropDownProps = {
    className?: string;
}

export default function UserDropDown(props: UserDropDownProps) {
    const router = useRouter();
    const { className } = props;
    const { logout } = AuthService;

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const accessToken = useAuthStore(state => state.accessToken);
    const fullName = useAuthStore(state => state.fullName);

    const isAuthenticated = !!accessToken;

    const items: MenuProps['items'] = [
        {
            key: 'profile',
            label: 'Thông tin cá nhân',
            icon: <User />
        },
        {
            type: "divider"
        },
        {
            key: "logout",
            label: "Đăng xuất",
            icon: <LogOut />,
            danger: true
        }
    ];

    const handleMenuClick: MenuProps['onClick'] = async ({ key }) => {

        switch (key) {
            case "profile":
                router.push("/profile");
                break;

            case "logout":
                try {
                    setIsLoggingOut(true);

                    await logout();

                    router.push("/");
                } catch (error) {
                    console.error("Lỗi gọi logout service:", error);
                } finally {
                    setIsLoggingOut(false);
                }
                break;
        }
    }

    return (
        <>
            {isLoggingOut && <MySpin description="Đang đăng xuất..." fullscreen />}

            <div className={`${className ?? ""}`}>
                {isAuthenticated ? (
                    <Dropdown
                        disabled={isLoggingOut}
                        menu={{ items, onClick: handleMenuClick }}
                        trigger={['click']}>
                        <div className="flex items-center gap-3 hover:cursor-pointer">
                            <Avatar size={'large'} icon={<User />} className="bg-white!" style={{ color: 'black' }} />
                            <p className="font-semibold capitalize! text-white m-0!">Hello {fullName}</p>
                            <DownOutlined style={{ color: '#fff' }} />
                        </div>
                    </Dropdown>
                ) : (
                    <button
                        onClick={() => router.push("/login")}
                        className="font-semibold text-white! cursor-pointer">
                        Đăng nhập
                    </button>
                )}
            </div>
        </>
    )
}