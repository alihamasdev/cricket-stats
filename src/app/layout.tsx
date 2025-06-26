import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased" style={geistSans.style}>
				<NuqsAdapter>{children}</NuqsAdapter>
			</body>
		</html>
	);
}
