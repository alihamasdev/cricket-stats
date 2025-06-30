"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

const themesList = [
	{ value: "light", Icon: SunMedium },
	{ value: "dark", Icon: MoonStar }
];

export function Footer() {
	const { setTheme, theme } = useTheme();

	return (
		<footer className="w-full border-t px-4 py-4">
			<div className="container mx-auto flex items-center justify-between">
				<p className="text-muted-foreground text-sm">&#169; 2025 Ali Hamas, Inc.</p>
				<div className="flex items-center rounded-full border p-1">
					{themesList.map(({ value, Icon }) => (
						<div
							key={value}
							onClick={() => setTheme(value)}
							className={cn(
								"hover:*:text-foreground cursor-pointer rounded-full p-2 transition-colors",
								theme === value && "bg-muted *:text-foreground"
							)}
						>
							<Icon className="size-4" />
						</div>
					))}
				</div>
			</div>
		</footer>
	);
}
