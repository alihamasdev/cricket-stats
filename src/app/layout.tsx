import { type Metadata } from "next";
import { Outfit } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";

const outfit = Outfit({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: "Ghurki Cricket Stats | Ali Hamas"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased" style={outfit.style}>
				<main className="container mx-auto min-h-dvh w-full px-4 py-8">
					<NuqsAdapter>{children}</NuqsAdapter>
				</main>
			</body>
		</html>
	);
}
