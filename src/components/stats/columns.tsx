"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { BattingStats, BowlingStats, FieldingStats } from "@/lib/types";
import { PlayerAvatar } from "@/components/ui/avatar";

function PlayerAvatarName({ name }: { name: string }) {
	return (
		<div className="flex min-w-25 items-center gap-x-2">
			<PlayerAvatar name={name} className="size-6 md:size-8" />
			<p className="font-medium capitalize">{name}</p>
		</div>
	);
}

export const battingColumns: ColumnDef<BattingStats>[] = [
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
];

export const bowlingColumns: ColumnDef<BowlingStats>[] = [
	{ accessorKey: "player", header: "Player", cell: ({ row }) => <PlayerAvatarName name={row.original.player} /> },
	{ accessorKey: "matches", header: "Mat" },
	{ accessorKey: "innings", header: "Inns" },
	{ accessorKey: "overs", header: "Overs" },
	{ accessorKey: "runs", header: "Runs" },
	{ accessorKey: "wickets", header: "Wkts" },
	{ accessorKey: "dots", header: "Dots" },
	{ accessorKey: "wides", header: "Wides" },
	{ accessorKey: "no_balls", header: "NB" }
];

export const fieldingColumns: ColumnDef<FieldingStats>[] = [
	{ accessorKey: "player", header: "Player", cell: ({ row }) => <PlayerAvatarName name={row.original.player} /> },
	{ accessorKey: "matches", header: "Matches" },
	{ accessorKey: "catches", header: "Catches" },
	{ accessorKey: "run_outs", header: "Run Outs" },
	{ accessorKey: "stumpings", header: "Stumpings" }
];
