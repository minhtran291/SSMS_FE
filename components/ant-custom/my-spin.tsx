import { ConfigProvider, Spin, SpinProps } from "antd";
import React from "react";

interface MySpinProps extends SpinProps {
    iconSize?: number;
}

export default function MySpin(props: MySpinProps) {
    const {
        spinning = true,
        description = 'Đang tải',
        fullscreen = false,
        iconSize = 60,
        ...rest
    } = props

    // const numericSize = typeof iconSize === "string" ? parseInt(iconSize, 10) : iconSize;

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorTextLightSolid: "blue",
                    colorWhite: "blue",
                    colorBgMask: "#dbd6d6",
                },
                components: {
                    Spin: {
                        dotSize: iconSize
                    }
                }
            }}>
            {/* <div className={!fullscreen ? "flex justify-center items-center" : ""}> */}
            <Spin
                {...rest}
                spinning={spinning}
                fullscreen={fullscreen}
                description={description}
                className="animate-pulse"
            />
            {/* </div> */}
        </ConfigProvider>
    )
}
