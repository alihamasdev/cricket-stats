"use client";

import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { DataTable } from "@/components/data-table";

interface StatsTableProps<T> {
	data: T[];
	columns: ColumnDef<T>[];
	title?: string;
	children?: React.ReactNode;
}

export function StatsTable<T>({ data, columns, title = "Ghurki Cricket Stats", children }: StatsTableProps<T>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	});

	return (
		<div className="mb-auto w-full space-y-6">
			<div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
				<h1 className="text-left text-2xl/9 font-bold capitalize">{title}</h1>
				<div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
					<Input
						className="w-full md:min-w-sm"
						placeholder="Search player"
						value={(table.getColumn("player")?.getFilterValue() as string) ?? ""}
						onChange={(event) => table.getColumn("player")?.setFilterValue(event.target.value)}
					/>
					{children}
				</div>
			</div>
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel defaultSize={100} minSize={50}>
					<DataTable table={table} />
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={0}>
					<div className="flex w-50 flex-col gap-y-3 rounded-xl border p-4 pt-2">
						<h2 className="text-xl font-semibold">Columns</h2>
						{table.getAllColumns().map((column, index) => (
							<Label key={column.id + index} className="capitalize">
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
