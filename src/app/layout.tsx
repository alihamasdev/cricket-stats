import { type Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ThemeProvider } from "@/lib/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";
import { cwc } from "@/app/fonts/cwc";

import "./globals.css";

export const metadata: Metadata = {
	title: "Cricket Stats | Ali Hamas"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased" style={cwc.style}>
				<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
					<main className="container mx-auto flex min-h-[calc(100dvh-61px)] w-full flex-col py-7">
						<NuqsAdapter>{children}</NuqsAdapter>
					</main>
					<Footer />
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
