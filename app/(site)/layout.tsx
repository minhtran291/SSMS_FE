import Header from "@/components/layout/header";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Layout className="min-h-screen">
                <Header />
                <Content className="p-3">
                    <div className="">{children}</div>
                </Content>
            </Layout>
        </>
    )
}