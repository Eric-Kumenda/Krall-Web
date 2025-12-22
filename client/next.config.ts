import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lnzvhhyokfsnlvozaqvw.supabase.co",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "bootstrapmade.com",
			},
			{
				protocol: "https",
				hostname: "plus.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "html.themegenix.com",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/api/admin/:path*",
				destination: `${
					process.env.NEXT_PUBLIC_ADMIN_API_URL ||
					"http://172.16.1.187:3002/api"
				}/:path*`,
			},
		];
	},
};

export default nextConfig;
