"use client";

import { use } from "react";
import { parseAsString, useQueryStates } from "nuqs";

import { type StatsReturn } from "@/lib/dal";
import { battingColumns, bowlingColumns, fieldingColumns } from "@/components/stats/columns";
import { StatsTable } from "@/components/stats/stats-table";

export function StatsPage({ stats }: { stats: Promise<StatsReturn> }) {
	const { batting, bowling, fielding } = use(stats);

	console.dir(batting);

	const [{ date, type }] = useQueryStates({
		date: parseAsString.withDefault("all-time"),
		type: parseAsString.withDefault("batting")
	});

	if (type === "bowling") {
		return <StatsTable columns={bowlingColumns} data={bowling[date]} />;
	}

	if (type === "fielding") {
		return <StatsTable columns={fieldingColumns} data={fielding[date]} />;
	}

	return <StatsTable columns={battingColumns} data={batting[date]} />;
}
