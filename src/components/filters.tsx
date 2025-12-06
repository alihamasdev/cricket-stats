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
	DropdownMenuCheckboxItem,
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

	const selectedDates = queryDate ?? [];

	const toggleDate = (date: string) => {
		if (selectedDates.includes(date)) {
			const newDates = selectedDates.filter((d) => d !== date);
			setQueryDate(newDates.length > 0 ? newDates : null);
		} else {
			setQueryDate([...selectedDates, date]);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<Calendar />
					{selectedDates.length > 0 ? `${selectedDates.length} selected` : "All Time"}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="max-h-96 overflow-y-auto">
				<DropdownMenuCheckboxItem
					checked={selectedDates.length === 0}
					onCheckedChange={() => setQueryDate(null)}
					className="font-medium"
				>
					All Time
				</DropdownMenuCheckboxItem>
				{dates.sort().map(({ id: date, title }) => (
					<DropdownMenuCheckboxItem
						key={date}
						checked={selectedDates.includes(date)}
						onCheckedChange={() => toggleDate(date)}
						className="justify-between"
						onSelect={(e) => e.preventDefault()}
					>
						<span className="font-medium">{title}</span>
						<span className="text-muted-foreground">({format(date, "PP")})</span>
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
