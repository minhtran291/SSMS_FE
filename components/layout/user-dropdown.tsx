'use client'

import { AuthService } from "@/shared/services/auth-services";
import { Avatar, Dropdown, MenuProps } from "antd";
import { LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import MySpin from "../ant-custom/my-spin";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

type UserDropDownProps = {
    className?: string;
}

export default function UserDropDown(props: UserDropDownProps) {
    const router = useRouter();
    const { className } = props;
    const { logout, getSession } = AuthService();

    const [oAuth, setOauth] = useState<any>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

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
        // if (e.key === 'logout') {
        //     try {
        //         setIsLoggingOut(true);
        //         await logout();
        //     } catch (error) {
        //         console.error("Lỗi khi đăng xuất:", error);
        //         setIsLoggingOut(false);
        //     }
        // }

        switch (key) {
            case "profile":
                router.push("/profile");
                break;

            case "logout":
                await logout();
                break;
        }
    }

    useEffect(() => {
        const session = getSession();
    }, []);

    return (
        <>
            {isLoggingOut && <MySpin description="Đang đăng xuất..." fullscreen />}
            <div className={`${className ? className : ''}`}>
                <Dropdown menu={{ items, onClick: handleMenuClick }}>
                    <div className="flex items-center gap-3 hover:cursor-pointer">
                        <Avatar size={'large'} icon={<User />} className="bg-white!" style={{ color: 'black' }} />
                        <p className="font-semibold capitalize! text-white m-0!">Hello 123 {oAuth?.full_name}</p>
                        <DownOutlined style={{ color: '#fff' }} />
                    </div>
                </Dropdown>
            </div>
        </>
    )
}