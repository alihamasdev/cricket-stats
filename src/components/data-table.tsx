"use client";

import { flexRender, Table as ReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DataTableProps<T> extends React.ComponentProps<typeof Table> {
	table: ReactTable<T>;
}

export function DataTable<T>({ table, ...props }: DataTableProps<T>) {
	return (
		<Table {...props}>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup, index) => (
					<TableRow key={headerGroup.id + index}>
						{headerGroup.headers.map((header, idx) => {
							return (
								<TableHead key={header.id + idx} className="text-center not-last:border-r first:text-left">
									<button className="cursor-pointer" onClick={() => header.column.toggleSorting(true)}>
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
	);
}
