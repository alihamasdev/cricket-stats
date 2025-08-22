"use client";

import { useState } from "react";
import Link from "next/link";
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Plus } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
		<div className="mb-auto w-full space-y-6">
			<div className="flex w-full items-center justify-between gap-x-4">
				<h1 className="text-left text-2xl/9 font-bold capitalize" onDoubleClick={() => setShow((prev) => !prev)}>
					Ghurki Cricket Stats
				</h1>
				<div className="flex w-full gap-x-4 md:w-auto">
					<Input
						className="min-w-sm"
						placeholder="Search players"
						value={(table.getColumn("player")?.getFilterValue() as string) ?? ""}
						onChange={(event) => table.getColumn("player")?.setFilterValue(event.target.value)}
					/>
					<div className="flex w-full items-center justify-between gap-x-4 md:w-auto">
						<DateFilter />
						<StatsTypeFilter />
						<Link href="/add-stats" className={buttonVariants()}>
							<Plus />
							Add Stats
						</Link>
					</div>
				</div>
			</div>
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel defaultSize={100} minSize={50} className={show ? "space-y-2 p-2" : ""}>
					{show && (
						<div className="flex items-center justify-between">
							<input className="w-full text-left text-xl/8 font-bold capitalize" defaultValue="Stats" />
							<DateFilter size="sm" />
						</div>
					)}
					<div className="overflow-hidden rounded-lg border">
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead key={header.id} className="text-center not-last:border-r first:min-w-35 first:text-left">
													{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
												</TableHead>
											);
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow key={row.id}>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id} className="text-center not-last:border-r first:min-w-35 first:text-left">
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
											No results.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={0}>
					<div className="flex w-50 flex-col gap-y-3 rounded-xl border p-4 pt-2" hidden={show}>
						<h2 className="text-xl font-semibold">Columns</h2>
						{table.getAllColumns().map((column) => (
							<Label key={column.id} className="capitalize">
								<Checkbox checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)} />
								{column.id.split("_").join(" ")}
							</Label>
						))}
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
