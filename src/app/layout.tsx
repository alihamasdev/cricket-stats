import { type Metadata } from "next";
import { Geist } from "next/font/google";

import "./globals.css";

import { ThemeProvider, ThemeToggler } from "@/components/theme";

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
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<main className="container mx-auto flex min-h-dvh w-full flex-col px-4">
						<header className="flex w-full items-center justify-between py-4">
							<h1 className="text-2xl font-semibold">Cricket Stats</h1>
							<ThemeToggler />
						</header>
						{children}
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
