import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  // 빈 turbopack 설정을 주어 Next 15+ 기본 turbopack 사용 시 webpack 에러 우회
  turbopack: {},
};

export default withPWA(nextConfig);
