"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { BattingStats, BowlingStats } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const battingColumns = [
	{
		accessorKey: "player",
		header: "Player",
		cell: ({ row }) => (
			<div className="flex items-center gap-x-2">
				<Avatar className="size-6 md:size-8">
					<AvatarImage src={`/players/${row.original.player}.png`} />
					<AvatarFallback />
				</Avatar>
				<span className="text-sm font-medium capitalize">{row.original.player}</span>
			</div>
		)
	},
	{ accessorKey: "innings", header: "Inns" },
	{ accessorKey: "runs", header: "Runs" },
	{ accessorKey: "balls", header: "Balls" },
	{ accessorKey: "not_outs", header: "NO" },
	{ accessorKey: "strike_rate", header: "SR", cell: ({ row }) => row.original.strike_rate.toFixed() },
	{ accessorKey: "average", header: "Avg", cell: ({ row }) => row.original.average.toFixed() },
	{ accessorKey: "fours", header: "4s" },
	{ accessorKey: "sixes", header: "6s" },
	{ accessorKey: "ducks", header: "Ducks" },
	{ accessorKey: "fifties", header: "50s" },
	{ accessorKey: "hundreds", header: "100s" }
] satisfies ColumnDef<BattingStats>[];

export const bowlingColumns = [
	{
		accessorKey: "player",
		header: "Player",
		cell: ({ row }) => (
			<div className="flex items-center gap-x-2">
				<Avatar className="size-6 md:size-8">
					<AvatarImage src={`/players/${row.original.player}.png`} />
					<AvatarFallback />
				</Avatar>
				<span className="text-sm font-medium capitalize">{row.original.player}</span>
			</div>
		)
	},
	{ accessorKey: "innings", header: "Inns" },
	{ accessorKey: "balls", header: "Overs" },
	{ accessorKey: "runs", header: "Runs" },
	{ accessorKey: "wickets", header: "Wkts" },
	{ accessorKey: "strike_rate", header: "Eco", cell: ({ row }) => row.original.strike_rate.toFixed(1) },
	{ accessorKey: "average", header: "Avg", cell: ({ row }) => row.original.average.toFixed() },
	{ accessorKey: "dots", header: "Dots" },
	{ accessorKey: "wides", header: "Wides" },
	{ accessorKey: "no_balls", header: "NBs" },
	{ accessorKey: "2fr", header: "2fr" },
	{ accessorKey: "3fr", header: "3fr" }
] satisfies ColumnDef<BowlingStats>[];
