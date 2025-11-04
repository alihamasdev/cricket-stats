"use client";

import { format } from "date-fns";
import { ArrowUpDown, Calendar } from "lucide-react";
import { useQueryState } from "nuqs";

import { Tables } from "@/lib/supabase/database";
import { dateSearchParams, typeSearchParams } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function StatsFilter() {
	const [type, setType] = useQueryState("type", typeSearchParams);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="capitalize">
					<ArrowUpDown />
					{type} stats
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup value={type} onValueChange={setType}>
					<DropdownMenuRadioItem value="batting">Batting</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="bowling">Bowling</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function DateFilter({ dates }: { dates: Tables<"dates">[] }) {
	const [queryDate, setQueryDate] = useQueryState("date", dateSearchParams);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<Calendar />
					{queryDate ? format(queryDate, "PP") : "All Time"}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup value={queryDate ?? ""} onValueChange={(value) => setQueryDate(value || null)}>
					<DropdownMenuRadioItem value="" className="font-medium">
						All Time
					</DropdownMenuRadioItem>
					{dates.sort().map(({ id: date, title }) => (
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
