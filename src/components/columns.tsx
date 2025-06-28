"use client";

import type { Column, ColumnDef } from "@tanstack/react-table";

import type { BattingStats, BowlingStats, FieldingStats } from "@/lib/types";
import { PlayerAvatarName } from "@/components/player-avatar";

function ColumnHeader<T>({ column, title }: { column: Column<T>; title: React.ReactNode }) {
	return (
		<button className="cursor-pointer" onClick={() => column.toggleSorting(true)}>
			{title}
		</button>
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
		header: ({ column }) => <ColumnHeader column={column} title="Matches" />
	},
	{
		accessorKey: "innings",
		header: ({ column }) => <ColumnHeader column={column} title="Innings" />
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
		header: ({ column }) => <ColumnHeader column={column} title="Not Outs" />
	},
	{
		accessorKey: "strike",
		header: ({ column }) => <ColumnHeader column={column} title="Strike Rate" />,
		cell: ({ row }) => {
			const runs = row.original.runs;
			const balls = row.original.balls;
			const strikeRate = balls > 0 ? (runs / balls) * 100 : 0;
			return <span>{strikeRate.toFixed(2)}</span>;
		}
	},
	{
		accessorKey: "average",
		header: ({ column }) => <ColumnHeader column={column} title="Average" />,
		cell: ({ row }) => {
			const runs = row.original.runs;
			const innings = row.original.innings;
			const notOuts = row.original.not_outs;
			const calcInnings = innings > 0 ? innings - notOuts : 0;
			const average = innings > 0 ? runs / (calcInnings > 0 ? calcInnings : 1) : 0;
			return <span>{average.toFixed(2)}</span>;
		}
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

export const bowlingColumns: ColumnDef<BowlingStats>[] = [
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
