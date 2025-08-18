"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { DateFilter } from "@/components/stats/date-filter";
import { StatsTypeFilter } from "@/components/stats/stats-type-filter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function StatsTable<T>({ data, columns }: { data: T[]; columns: any }) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	});

	const [show, setShow] = useState(false);

	return (
		<Fragment>
			<header className="flex w-full flex-col items-center justify-between gap-y-4 pb-6 md:flex-row md:gap-x-4">
				<h1
					className="text-center text-2xl/9 font-bold capitalize md:text-left"
					onDoubleClick={() => setShow((prev) => !prev)}
				>
					Ghurki Cricket Stats
				</h1>
				<div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
					<Input
						placeholder="Search players"
						className="lg:min-w-sm"
						value={(table.getColumn("player")?.getFilterValue() as string) ?? ""}
						onChange={(event) => table.getColumn("player")?.setFilterValue(event.target.value)}
					/>
					<div className="flex w-full items-center justify-between gap-x-4 md:w-auto">
						<DateFilter />
						<StatsTypeFilter />
						<Button asChild>
							<Link href="/stats/add">
								<Plus />
								Add Stats
							</Link>
						</Button>
					</div>
				</div>
			</header>
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel defaultSize={100} minSize={50} className={show ? "space-y-2 p-2" : ""}>
					{show && (
						<div className="flex items-center justify-between">
							<input className="w-full text-left text-xl/8 font-bold capitalize" defaultValue="Stats" />
							<DateFilter size="sm" />
						</div>
					)}
					<DataTable table={table} />
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={0}>
					<div className="flex w-50 flex-col gap-y-3 rounded-xl border p-4 pt-2" hidden={show}>
						<h2 className="text-xl font-semibold">Columns</h2>
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<Label key={column.id} className="capitalize">
										<Checkbox
											checked={column.getIsVisible()}
											onCheckedChange={(value) => column.toggleVisibility(!!value)}
										/>
										{column.id.split("_").join(" ")}
									</Label>
								);
							})}
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</Fragment>
	);
}
