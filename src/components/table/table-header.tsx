"use client";

import { type Table } from "@tanstack/react-table";
import { ArrowUpDown, Settings2 } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export function TableHeader<T>({ table }: { table: Table<T> }) {
	const [stats, setStats] = useQueryState("type", { defaultValue: "batting" });

	return (
		<header className="grid w-full grid-cols-2 pb-5">
			<h1 className="text-2xl/9 font-semibold capitalize">{stats} Stats</h1>
			<div className="flex w-full items-center justify-end gap-x-4">
				<Input
					placeholder="Search players"
					className="w-full max-w-sm"
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							<ArrowUpDown />
							Stats Type
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
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							<Settings2 />
							Columns
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) => column.toggleVisibility(!!value)}
									>
										{column.id.split("_").join(" ")}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
