"use client";

import { Fragment } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Plus, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { DateFilter } from "@/components/date-filter";
import { StatsTypeFilter } from "@/components/stats-type-filter";

export function StatsTable<T>({ data, columns }: { data: T[]; columns: any }) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	});

	const statsTypeParam = useSearchParams().get("type") || "batting";

	return (
		<Fragment>
			<header className="flex w-full flex-col items-center justify-between gap-y-4 pb-6 md:flex-row md:gap-x-4">
				<h1 className="text-center text-2xl/9 font-semibold capitalize md:text-left">{statsTypeParam} Stats</h1>
				<div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
					<Input
						placeholder="Search players"
						className="lg:min-w-md"
						value={(table.getColumn("player")?.getFilterValue() as string) ?? ""}
						onChange={(event) => table.getColumn("player")?.setFilterValue(event.target.value)}
					/>
					<div className="flex w-full items-center justify-between gap-x-4 md:w-auto">
						<DateFilter />
						<StatsTypeFilter />
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
						<Button className="hidden md:inline-flex" asChild>
							<Link href="/add">
								<Plus />
								Add Stats
							</Link>
						</Button>
					</div>
				</div>
			</header>
			<DataTable table={table} />
		</Fragment>
	);
}
