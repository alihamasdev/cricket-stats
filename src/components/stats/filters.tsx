"use client";

import { format } from "date-fns";
import { ArrowUpDown, Calendar } from "lucide-react";
import { useQueryState } from "nuqs";

import { dates } from "@/data/data.json";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function StatsFilter() {
	const [stats, setStats] = useQueryState("stats", { defaultValue: "batting" });
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="capitalize">
					<ArrowUpDown />
					{stats} stats
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup value={stats} onValueChange={setStats}>
					<DropdownMenuRadioItem value="batting">Batting</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="bowling">Bowling</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="fielding">Fielding</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function DateFilter({ variant = "outline", ...props }: React.ComponentProps<typeof Button>) {
	const [queryDate, setQueryDate] = useQueryState("date", { defaultValue: "" });

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={variant} {...props}>
					<Calendar />
					{queryDate ? format(queryDate, "PP") : "All Time"}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuRadioGroup value={queryDate} onValueChange={setQueryDate}>
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
