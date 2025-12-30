/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default {
  async rewrites() {
    return [
      {
        source: "/contents",
        destination: "http://127.0.0.1:8080/contents", // 백엔드 서버 주소
      },
    ];
  },
};