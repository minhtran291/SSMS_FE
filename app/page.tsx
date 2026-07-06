'use client'
import MySpin from "@/components/ant-custom/my-spin";
import { CloseOutlined, CloseSquareOutlined, EyeOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
export default function Home() {
  return (
    <div className="">
      {/* <Button type="primary">Hello Ant Design</Button> */}

      {/* <Spin
        spinning={true}
        description="Đang tải..."
        delay={5000}
        indicator={<LoadingOutlined />}
        size="large"
        style={{ color: "black" }}
      /> */}

      {/* <h1>My Spin</h1> */}
      <MySpin
        // iconSize="3rem"
        fullscreen={false}
      >

      </MySpin>

      <br />
      {/* <Spin className="flex justify-center items-center"></Spin> */}

    </div>
  );
}
