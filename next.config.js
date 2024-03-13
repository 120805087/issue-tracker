/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "referrerPolicy",
            value: "no-referrer",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
