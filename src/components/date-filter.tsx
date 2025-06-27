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

export function DateFilter() {
	const { dates, statsDate, setStatsDate } = useStats();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<Calendar />
					{statsDate ? format(statsDate, "MMM d, yyyy") : "All Time"}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuRadioGroup value={statsDate} onValueChange={setStatsDate}>
					<DropdownMenuRadioItem value="">All Time</DropdownMenuRadioItem>
					{dates.map(({ date, title }) => (
						<DropdownMenuRadioItem key={date} value={date} className="justify-between">
							<span className="font-medium">{title}</span>
							<span className="text-muted-foreground">({format(date, "MMM d, yyyy")})</span>
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
