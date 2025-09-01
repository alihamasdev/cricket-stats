"use client";

import { use } from "react";
import Link from "next/link";
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { parseAsString, useQueryStates } from "nuqs";

import type { StatsReturn } from "@/lib/dal";
import type { BattingStats, BowlingStats, FieldingStats } from "@/lib/types";
import { PlayerAvatarName } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { DataTable } from "@/components/data-table";
import { DateFilter, StatsFilter } from "@/components/filters";

const columns = {
	batting: [
		{ accessorKey: "player", header: "Player", cell: ({ row }) => <PlayerAvatarName name={row.original.player} /> },
		{ accessorKey: "matches", header: "Mat" },
		{ accessorKey: "innings", header: "Inns" },
		{ accessorKey: "runs", header: "Runs" },
		{ accessorKey: "balls", header: "Balls" },
		{ accessorKey: "not_outs", header: "NO" },
		{ accessorKey: "strike_rate", header: "SR" },
		{ accessorKey: "average", header: "Avg" },
		{ accessorKey: "fours", header: "4s" },
		{ accessorKey: "sixes", header: "6s" },
		{ accessorKey: "ducks", header: "0s" }
	],
	bowling: [
		{ accessorKey: "player", header: "Player", cell: ({ row }) => <PlayerAvatarName name={row.original.player} /> },
		{ accessorKey: "matches", header: "Mat" },
		{ accessorKey: "innings", header: "Inns" },
		{ accessorKey: "overs", header: "Overs" },
		{ accessorKey: "runs", header: "Runs" },
		{ accessorKey: "wickets", header: "Wkts" },
		{ accessorKey: "dots", header: "Dots" },
		{ accessorKey: "wides", header: "Wides" },
		{ accessorKey: "no_balls", header: "NB" }
	],
	fielding: [
		{ accessorKey: "player", header: "Player", cell: ({ row }) => <PlayerAvatarName name={row.original.player} /> },
		{ accessorKey: "matches", header: "Matches" },
		{ accessorKey: "catches", header: "Catches" },
		{ accessorKey: "run_outs", header: "Run Outs" },
		{ accessorKey: "stumpings", header: "Stumpings" }
	]
} satisfies {
	batting: ColumnDef<BattingStats>[];
	bowling: ColumnDef<BowlingStats>[];
	fielding: ColumnDef<FieldingStats>[];
};

export function StatsPage({ stats }: { stats: Promise<StatsReturn> }) {
	const { batting, bowling, fielding } = use(stats);
	const [{ date, type }] = useQueryStates({
		date: parseAsString.withDefault("all-time"),
		type: parseAsString.withDefault("batting")
	});

	if (type === "bowling") {
		return <StatsTable columns={columns.bowling} data={bowling[date]} />;
	}

	if (type === "fielding") {
		return <StatsTable columns={columns.fielding} data={fielding[date]} />;
	}

	return <StatsTable columns={columns.batting} data={batting[date]} />;
}

function StatsTable<T>({ data, columns }: { data: T[]; columns: ColumnDef<T>[] }) {
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
				<h1 className="text-left text-2xl/9 font-bold capitalize">Ghurki Cricket Stats</h1>
				<div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
					<Input
						className="w-full md:min-w-sm"
						placeholder="Search player"
						value={(table.getColumn("player")?.getFilterValue() as string) ?? ""}
						onChange={(event) => table.getColumn("player")?.setFilterValue(event.target.value)}
					/>
					<div className="flex w-full items-center justify-between gap-x-4 md:w-auto">
						<DateFilter />
						<StatsFilter />
						<Link href="/add-stats" className={buttonVariants({ className: "hidden md:inline-flex" })}>
							<Plus />
							Add Stats
						</Link>
					</div>
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
