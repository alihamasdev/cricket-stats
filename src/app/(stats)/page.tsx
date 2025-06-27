"use client";

import { useQueryState } from "nuqs";

import { useStats } from "@/context/stats-context";
import { battingColumns, bowlingColumns, fieldingColumns } from "@/components/columns";
import { StatsTable } from "@/components/stats-table";

export default function StatsPage() {
	const { battingStats, bowlingStats, fieldingStats } = useStats();

	const [statTypeParam] = useQueryState("type");

	if (statTypeParam === "bowling") {
		return <StatsTable columns={bowlingColumns} data={bowlingStats} />;
	}

	if (statTypeParam === "fielding") {
		return <StatsTable columns={fieldingColumns} data={fieldingStats} />;
	}

	return <StatsTable columns={battingColumns} data={battingStats} />;
}
