"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { filter } from "lodash";
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";

import type { BallStats, CompareStats } from "@/lib/types";
import { calculatePlayerStats } from "@/lib/utils";
import { balls, players } from "@/data/data.json";

import { PlayerTable } from "./player-table";

function getPlayerStats(data: BallStats[], player: string, type: "batting" | "bowling"): CompareStats[] {
	const filterData = filter(data, type === "batting" ? { batter: player } : { bowler: player });
	const playersData = players.map((name) => {
		const playerData = filter(filterData, type === "batting" ? { bowler: name } : { batter: name });
		return calculatePlayerStats(name, playerData);
	});

	return playersData.filter(({ balls }) => balls > 0);
}

export default function PlayerPage() {
	const { player } = useParams<{ player: string }>();
	const [{ type, date }] = useQueryStates(
		{
			type: parseAsStringLiteral(["batting", "bowling"]).withDefault("batting"),
			date: parseAsString.withDefault("all-time")
		},
		{ history: "push" }
	);

	const filterData = filter(balls, date !== "all-time" ? { date } : {});
	const data = useMemo(() => getPlayerStats(filterData, player, type), [filterData, player, type]);

	return (
		<div className="mx-auto mb-auto w-full max-w-3xl space-y-3 md:space-y-6">
			<PlayerTable data={data} />
		</div>
	);
}
