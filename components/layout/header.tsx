'use client'

import { Header as AntHeader } from 'antd/es/layout/layout';
import UserDropDown from "./user-dropdown";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
    const router = useRouter();
    return (
        <AntHeader className="flex bg-blue-500!">
            <div className="flex-1 flex gap-2">
                <Link
                    href="/"
                    className="text-white! cursor-pointer">
                    My app
                </Link>
                <ul className="flex-1">
                    <li>
                        <Link
                            href="/category"
                            className="cursor-pointer text-white!">
                            Category
                        </Link>
                    </li>
                </ul>
            </div>
            <UserDropDown />
        </AntHeader>
    )
}