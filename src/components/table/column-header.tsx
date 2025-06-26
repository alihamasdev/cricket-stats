"use client";

import { type Column } from "@tanstack/react-table";

export function ColumnHeader<T>({ column, title }: { column: Column<T>; title: React.ReactNode }) {
	return (
		<button className="cursor-pointer" onClick={() => column.toggleSorting(true)}>
			{title}
		</button>
	);
}
