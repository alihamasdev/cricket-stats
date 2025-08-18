import { type Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ThemeProvider } from "@/lib/theme-provider";
import { cwc } from "@/app/fonts/cwc";

import "./globals.css";

import { Footer } from "@/components/footer";

export const metadata: Metadata = {
	title: "Cricket Stats | Ali Hamas"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased" style={cwc.style}>
				<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
					<main className="container mx-auto flex min-h-[calc(100dvh-61px)] w-full flex-col px-4 py-7 sm:px-0">
						<NuqsAdapter>{children}</NuqsAdapter>
					</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
