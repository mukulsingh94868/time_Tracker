/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true, // Ensure pages generate with a trailing slash (optional)
    output: 'standalone', // Ensure Vercel serves it correctly
    async redirects() {
        return [
            {
                source: "/:path*",
                destination: "/",
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
