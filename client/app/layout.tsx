import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";


import "./globals.css";
import { ReduxProvider } from "@/store/provider";

const nunito = Nunito({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-nunito",
});
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "The Krall",
		template: "%s | The Krall",
	},
	description: "Fulfilling small dreams and big plans. A hub for creativity, mentorship, and community growth.",
	icons: {
		icon: "/assets/img/Krall Logo -Primary.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-theme="dark">
			<head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta name="theme-color" content="#ffce1b" />
				<link rel="icon" href="/assets/img/Krall Logo -Primary.svg" />
				
			</head>
			<body className={`${nunito.variable} ${geistMono.variable}`}>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}
