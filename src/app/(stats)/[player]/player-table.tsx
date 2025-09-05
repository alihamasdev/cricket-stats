"use client";

import { useParams } from "next/navigation";
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { useQueryState } from "nuqs";

import { type CompareStats } from "@/lib/types";
import { PlayerAvatar, PlayerAvatarName } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { DataTable } from "@/components/data-table";
import { DateFilter, StatsFilter } from "@/components/filters";

const columns = [
	{ accessorKey: "name", header: "Player", cell: ({ row }) => <PlayerAvatarName name={row.original.name} /> },
	{ accessorKey: "runs", header: "Runs" },
	{ accessorKey: "balls", header: "Balls" },
	{ accessorKey: "fours", header: "4s" },
	{ accessorKey: "sixes", header: "6s" },
	{ accessorKey: "strikeRate", header: "SR" },
	{ accessorKey: "outs", header: "Out" }
] satisfies ColumnDef<CompareStats>[];

export function PlayerTable({ data }: { data: CompareStats[] }) {
	const { player } = useParams<{ player: string }>();
	const [type] = useQueryState("type", { defaultValue: "batting" });

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	});

	return (
		<>
			<div className="flex w-full flex-col justify-between gap-3 md:flex-row">
				<h1 className="flex items-center gap-x-2">
					<PlayerAvatar name={player} className="size-9" />
					<span className="text-2xl/9 font-bold capitalize">{`${player} ${type} Stats`}</span>
				</h1>
				<div className="grid grid-cols-2 gap-4 md:flex">
					<DateFilter />
					<StatsFilter hasFielding={false} />
				</div>
			</div>
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel defaultSize={100} minSize={30}>
					<DataTable table={table} />
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={0}>
					<div className="flex w-35 flex-col gap-y-3 rounded-xl border p-4 pt-2">
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
		</>
	);
}
