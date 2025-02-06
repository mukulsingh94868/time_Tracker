/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true, // Ensure pages generate with a trailing slash (optional)
    output: 'standalone', // Ensure Vercel serves it correctly
};

export default nextConfig;
