"use client";

import type { Column, ColumnDef } from "@tanstack/react-table";

import type { BattingStats, BowlingStats, FieldingStats } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ColumnHeader<T>({ column, title }: { column: Column<T>; title: React.ReactNode }) {
	return (
		<button className="cursor-pointer" onClick={() => column.toggleSorting(true)}>
			{title}
		</button>
	);
}

function PlayerAvatarName({ name }: { name: string }) {
	return (
		<div className="flex items-center gap-x-2">
			<Avatar className="size-6 md:size-8">
				<AvatarImage src={`/players/${name}.png`} />
				<AvatarFallback />
			</Avatar>
			<p className="font-medium capitalize">{name}</p>
		</div>
	);
}

export const battingColumns: ColumnDef<BattingStats>[] = [
	{
		accessorKey: "player",
		header: ({ column }) => <ColumnHeader column={column} title="Name" />,
		cell: ({ row }) => <PlayerAvatarName name={row.original.player} />
	},
	{
		accessorKey: "matches",
		header: ({ column }) => <ColumnHeader column={column} title="Mat" />
	},
	{
		accessorKey: "innings",
		header: ({ column }) => <ColumnHeader column={column} title="Inns" />
	},
	{
		accessorKey: "runs",
		header: ({ column }) => <ColumnHeader column={column} title="Runs" />
	},
	{
		accessorKey: "balls",
		header: ({ column }) => <ColumnHeader column={column} title="Balls" />
	},
	{
		accessorKey: "not_outs",
		header: ({ column }) => <ColumnHeader column={column} title="NO" />
	},
	{
		accessorKey: "strike_rate",
		header: ({ column }) => <ColumnHeader column={column} title="SR" />
	},
	{
		accessorKey: "average",
		header: ({ column }) => <ColumnHeader column={column} title="Avg" />
	},
	{
		accessorKey: "fours",
		header: ({ column }) => <ColumnHeader column={column} title="4s" />
	},
	{
		accessorKey: "sixes",
		header: ({ column }) => <ColumnHeader column={column} title="6s" />
	},
	{
		accessorKey: "ducks",
		header: ({ column }) => <ColumnHeader column={column} title="0s" />
	}
];

export const bowlingColumns: ColumnDef<BowlingStats>[] = [
	{
		accessorKey: "player",
		header: ({ column }) => <ColumnHeader column={column} title="Name" />,
		cell: ({ row }) => <PlayerAvatarName name={row.original.player} />
	},
	{
		accessorKey: "matches",
		header: ({ column }) => <ColumnHeader column={column} title="Mat" />
	},
	{
		accessorKey: "innings",
		header: ({ column }) => <ColumnHeader column={column} title="Inns" />
	},
	{
		accessorKey: "overs",
		header: ({ column }) => <ColumnHeader column={column} title="Overs" />
	},
	{
		accessorKey: "runs",
		header: ({ column }) => <ColumnHeader column={column} title="Runs" />
	},
	{
		accessorKey: "wickets",
		header: ({ column }) => <ColumnHeader column={column} title="Wkts" />
	},
	{
		accessorKey: "dots",
		header: ({ column }) => <ColumnHeader column={column} title="Dots" />
	},
	{
		accessorKey: "wides",
		header: ({ column }) => <ColumnHeader column={column} title="Wides" />
	},
	{
		accessorKey: "no_balls",
		header: ({ column }) => <ColumnHeader column={column} title="NB" />
	}
];

export const fieldingColumns: ColumnDef<FieldingStats>[] = [
	{
		accessorKey: "player",
		header: ({ column }) => <ColumnHeader column={column} title="Name" />,
		cell: ({ row }) => <PlayerAvatarName name={row.original.player} />
	},
	{
		accessorKey: "matches",
		header: ({ column }) => <ColumnHeader column={column} title="Matches" />
	},
	{
		accessorKey: "catches",
		header: ({ column }) => <ColumnHeader column={column} title="Catches" />
	},
	{
		accessorKey: "run_outs",
		header: ({ column }) => <ColumnHeader column={column} title="Run Outs" />
	},
	{
		accessorKey: "stumpings",
		header: ({ column }) => <ColumnHeader column={column} title="Stumpings" />
	}
];
