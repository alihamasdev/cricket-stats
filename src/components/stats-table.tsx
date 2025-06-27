"use client";

import { Fragment } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DateFilter } from "@/components/date-filter";
import { StatsTypeFilter } from "@/components/stats-type-filter";
import { DataTable } from "@/components/table/data-table";

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
			<header className="grid w-full grid-rows-2 gap-4 pb-5 md:grid-cols-2 md:grid-rows-1">
				<h1 className="text-center text-2xl/9 font-semibold capitalize md:text-left">{statsTypeParam} Stats</h1>
				<div className="flex items-center justify-center gap-x-4 md:justify-end">
					<DateFilter />
					<StatsTypeFilter />
					<Button asChild>
						<Link href="/add">
							<Plus />
							Add Stats
						</Link>
					</Button>
				</div>
			</header>
			<DataTable table={table} />
		</Fragment>
	);
}
