"use client";

import Link from "next/link";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

export function Footer() {
	const { setTheme } = useTheme();

	return (
		<footer className="w-full border-t px-4 py-4">
			<div className="container mx-auto flex items-center justify-between">
				<p className="text-muted-foreground text-sm">
					&#169; 2025{" "}
					<a href="https://alihamas.vercel.app" target="_blank" className="hover:underline">
						Ali Hamas
					</a>
					, Inc.
				</p>
				<div className="text-muted-foreground flex items-center gap-x-4 text-sm *:hover:underline">
					<Link href="/stats" prefetch={false}>
						Stats
					</Link>
					<Link href="/stats/add-stats" prefetch={false}>
						Add Stats
					</Link>
					<Link href="/stats/add-wicket" prefetch={false}>
						Add Wickets
					</Link>
					<Link href="/scorecard" prefetch={false}>
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
