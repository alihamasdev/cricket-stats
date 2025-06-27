"use client";

import type { Column, ColumnDef } from "@tanstack/react-table";

import { type Tables } from "@/lib/supabase/database";
import { PlayerAvatarName } from "@/components/player-avatar";

function ColumnHeader<T>({ column, title }: { column: Column<T>; title: React.ReactNode }) {
	return (
		<button className="cursor-pointer" onClick={() => column.toggleSorting(true)}>
			{title}
		</button>
	);
}

export const battingColumns: ColumnDef<Tables<"batting">>[] = [
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

export const bowlingColumns: ColumnDef<Tables<"batting">>[] = [
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

export const fieldingColumns: ColumnDef<Tables<"batting">>[] = [
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
