"use client";

import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";

import { Tables } from "@/lib/supabase/database";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DateFilter, StatsFilter } from "@/components/filters";

interface DataTableProps<T> {
	data: T[];
	columns: ColumnDef<T>[];
	dates: Tables<"dates">[];
	children?: React.ReactNode;
}

export function DataTable<T>({ data, columns, dates, children }: DataTableProps<T>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel()
	});

	return (
		<ResizablePanelGroup direction="horizontal">
			<ResizablePanel defaultSize={100} minSize={50}>
				<div className="mb-4 flex items-center justify-between">
					{children}
					<div className="flex items-center gap-4">
						<StatsFilter />
						<DateFilter dates={dates} />
					</div>
				</div>
				<Table className="text-sm">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup, index) => (
							<TableRow key={headerGroup.id + index}>
								{headerGroup.headers.map((header, idx) => {
									return (
										<TableHead key={header.id + idx} className="text-center not-last:border-r first:text-left">
											<button
												className="cursor-pointer"
												onClick={() => header.column.toggleSorting(true)}
												onDoubleClick={() => header.column.toggleSorting(false)}
											>
												{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
											</button>
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row, index) => (
								<TableRow key={row.id + index}>
									{row.getVisibleCells().map((cell, idx) => (
										<TableCell key={cell.id + idx} className="text-center not-last:border-r first:text-left">
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
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel defaultSize={0}>
				<div className="mt-13 flex w-50 flex-col gap-3 rounded-md border p-4 pt-2">
					<h2 className="font-semibold">Columns</h2>
					{table.getAllColumns().map((column, index) => (
						<Label key={column.id + index} className="text-xs capitalize">
							<Checkbox checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)} />
							{column.id.split("_").join(" ")}
						</Label>
					))}
				</div>
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
