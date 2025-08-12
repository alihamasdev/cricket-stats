import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";

import { ThemeProvider } from "@/lib/theme-provider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: "Cricket Stats | Ali Hamas"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased" style={geistSans.style}>
				<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
					<NuqsAdapter>{children}</NuqsAdapter>
				</ThemeProvider>
			</body>
		</html>
	);
}
