import { type Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ThemeProvider } from "@/lib/theme-provider";
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
					<NuqsAdapter>{children}</NuqsAdapter>
				</ThemeProvider>
			</body>
		</html>
	);
}
