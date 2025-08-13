"use client";

import { format } from "date-fns";
import { Calendar } from "lucide-react";

import { useStats } from "@/context/stats-context";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function DateFilter({ variant = "outline", ...props }: React.ComponentProps<typeof Button>) {
	const { dates, statsDate, setStatsDate } = useStats();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={variant} {...props}>
					<Calendar />
					{statsDate ? format(statsDate, "PP") : "All Time"}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuRadioGroup value={statsDate} onValueChange={setStatsDate}>
					<DropdownMenuRadioItem value="">All Time</DropdownMenuRadioItem>
					{dates.map(({ date, title }) => (
						<DropdownMenuRadioItem key={date} value={date} className="justify-between">
							<span className="font-medium">{title}</span>
							<span className="text-muted-foreground">({format(date, "PP")})</span>
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
