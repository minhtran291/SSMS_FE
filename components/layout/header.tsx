'use client'

import { Header as AntHeader } from 'antd/es/layout/layout';
import UserDropDown from "./user-dropdown";

export default function Header() {

    return (
        <AntHeader className="flex bg-blue-500!">
            <div className="flex-1">
                <span className="text-white">My app</span>
            </div>
            <UserDropDown />
        </AntHeader>
    )
}