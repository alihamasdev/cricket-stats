import { type Metadata } from "next";
import { Geist } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: "Cricket Stats",
	description: "Gully cricket stats"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="antialiased" style={geistSans.style}>
				{children}
			</body>
		</html>
	);
}
