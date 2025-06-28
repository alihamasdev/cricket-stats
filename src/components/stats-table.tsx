"use client";

import { Fragment } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
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
			<header className="flex w-full flex-col items-center justify-between gap-y-4 pb-5 md:flex-row md:gap-x-4">
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
						<Button asChild>
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
