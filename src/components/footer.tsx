"use client";

import Link from "next/link";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

export function Footer() {
	const { setTheme } = useTheme();
	return (
		<footer className="w-full border-t px-4 py-4">
			<div className="container mx-auto flex items-center justify-between">
				<div className="text-muted-foreground flex items-center gap-4 text-sm font-medium *:hover:underline">
					<Link href="/" prefetch={false}>
						Stats
					</Link>
					<Link href="/compare" prefetch={false}>
						Compare
					</Link>
					<Link href="/scorecard" className="hidden md:inline" prefetch={false}>
						Scorecard
					</Link>
				</div>
				<div className="flex items-center rounded-full border p-0.5">
					<div onClick={() => setTheme("light")} className="bg-muted cursor-pointer rounded-full p-1 transition-colors dark:bg-transparent">
						<SunMedium className="dark:text-muted-foreground text-foreground size-3.5" />
					</div>
					<div onClick={() => setTheme("dark")} className="dark:bg-muted cursor-pointer rounded-full bg-transparent p-1 transition-colors">
						<MoonStar className="text-muted-foreground dark:text-foreground size-3.5" />
					</div>
				</div>
			</div>
		</footer>
	);
}
