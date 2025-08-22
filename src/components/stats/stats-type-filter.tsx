"use client";

import { ArrowUpDown } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function StatsTypeFilter({ hasFielding = true }: { hasFielding?: boolean }) {
	const [statTypeParam, setStatTypeParam] = useQueryState("type", { defaultValue: "batting" });

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="capitalize">
					<ArrowUpDown />
					{statTypeParam} stats
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup value={statTypeParam} onValueChange={setStatTypeParam}>
					<DropdownMenuRadioItem value="batting">Batting</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="bowling">Bowling</DropdownMenuRadioItem>
					{hasFielding && <DropdownMenuRadioItem value="fielding">Fielding</DropdownMenuRadioItem>}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
