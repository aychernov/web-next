import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: '/stats',
        destination: 'https://api.aychernov.ru/stats', // Проксирование на другой сервер
      },
    ];
  },
  // experimental: {
  //   useLightningcss: true,
  // },
};

export default nextConfig;
