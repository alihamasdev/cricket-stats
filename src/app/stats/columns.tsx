"use client";

import { type ColumnDef } from "@tanstack/react-table";

import type { PlayerBattingStats, PlayerBowlingStats, PlayerFieldingStats } from "@/lib/helpers";
import { PlayerAvatarName } from "@/components/player-avatar";
import { ColumnHeader } from "@/components/table/column-header";

export const battingColumns: ColumnDef<PlayerBattingStats>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => <ColumnHeader column={column} title="Name" />,
		cell: ({ row }) => <PlayerAvatarName name={row.original.name} />
	},
	{
		accessorKey: "matches",
		header: ({ column }) => <ColumnHeader column={column} title="Matches" />
	},
	{
		accessorKey: "innings",
		header: ({ column }) => <ColumnHeader column={column} title="Innings" />
	},
	{
		accessorKey: "balls",
		header: ({ column }) => <ColumnHeader column={column} title="Balls" />
	},
	{
		accessorKey: "runs",
		header: ({ column }) => <ColumnHeader column={column} title="Runs" />
	},
	{
		accessorKey: "average",
		header: ({ column }) => <ColumnHeader column={column} title="Average" />
	},
	{
		accessorKey: "strike_rate",
		header: ({ column }) => <ColumnHeader column={column} title="Strike Rate" />
	},
	{
		accessorKey: "fours",
		header: ({ column }) => <ColumnHeader column={column} title="Fours" />
	},
	{
		accessorKey: "sixes",
		header: ({ column }) => <ColumnHeader column={column} title="Sixes" />
	},
	{
		accessorKey: "ducks",
		header: ({ column }) => <ColumnHeader column={column} title="Ducks" />
	}
];

export const bowlingColumns: ColumnDef<PlayerBowlingStats>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => <ColumnHeader column={column} title="Name" />,
		cell: ({ row }) => <PlayerAvatarName name={row.original.name} />
	},
	{
		accessorKey: "matches",
		header: ({ column }) => <ColumnHeader column={column} title="Matches" />
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
		header: ({ column }) => <ColumnHeader column={column} title="Wickets" />
	},
	{
		accessorKey: "economy",
		header: ({ column }) => <ColumnHeader column={column} title="Economy" />
	},
	{
		accessorKey: "strike_rate",
		header: ({ column }) => <ColumnHeader column={column} title="Strike Rate" />
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
		header: ({ column }) => <ColumnHeader column={column} title="No Balls" />
	}
];

export const fieldingColumns: ColumnDef<PlayerFieldingStats>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => <ColumnHeader column={column} title="Name" />,
		cell: ({ row }) => <PlayerAvatarName name={row.original.name} />
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
