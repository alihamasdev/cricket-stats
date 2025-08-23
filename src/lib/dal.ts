import { cache } from "react";

import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import type { AllTimeStats, BattingStats, BowlingStats, FieldingStats } from "@/lib/types";
import { calculateBattingStats, calculateBowlingStats, calculateFieldingStats } from "@/lib/utils";

export type StatsData = {
	allTimeStats: AllTimeStats[];
	batting: Record<string, BattingStats>[];
	bowling: Record<string, BowlingStats>[];
	fielding: Record<string, FieldingStats>[];
	players: string[];
};

export async function getStats(): Promise<StatsData> {
	const supabase = await createClient();
	const { data, error } = await supabase.from("players").select(`name, batting(*), bowling(*), fielding(*)`);

	if (error) {
		console.log({ statsError: error });
		throw new Error(error.message);
	}

	const allTimeStats = data.map(({ batting, bowling, fielding, name: player }) => ({
		batting: calculateBattingStats(batting, player),
		bowling: calculateBowlingStats(bowling, player),
		fielding: calculateFieldingStats(fielding, player)
	})) satisfies AllTimeStats[];

	const batting = data.map(({ batting }) => {
		return batting.reduce((acc: Record<string, BattingStats>, stat) => {
			acc[stat.date] = stat;
			return acc;
		}, {});
	});

	const bowling = data.map(({ bowling }) =>
		bowling.reduce((acc: Record<string, BowlingStats>, stat) => {
			acc[stat.date] = stat;
			return acc;
		}, {})
	);

	const fielding = data.map(({ fielding }) =>
		fielding.reduce((acc: Record<string, FieldingStats>, stat) => {
			acc[stat.date] = stat;
			return acc;
		}, {})
	);

	const players = data.map(({ name }) => name);

	return { allTimeStats, batting, bowling, fielding, players };
}

export type DatesData = Awaited<ReturnType<typeof getDates>>;

export async function getDates() {
	const supabase = await createClient();
	const { data, error } = await supabase.from("dates").select("*").order("date", { ascending: false });

	if (error) {
		console.log({ dateError: error });
		throw new Error(error.message);
	}

	return data;
}

export const getComparePlayersStats = cache(async (player1?: string, player2?: string) => {
	if (!player1 || !player2) return null;

	const [player1Stats, player1Fours, player1Sixes, player1Outs, player2Stats, player2Fours, player2Sixes, player2Outs] =
		await prisma.$transaction([
			prisma.stats.aggregate({ _sum: { score: true }, _count: { wicket: true }, where: { batter: player1, bowler: player2 } }),
			prisma.stats.count({ where: { batter: player1, bowler: player2, score: 4 } }),
			prisma.stats.count({ where: { batter: player1, bowler: player2, score: 6 } }),
			prisma.stats.count({ where: { batter: player2, bowler: player1, wicket: true } }),
			prisma.stats.aggregate({ _sum: { score: true }, _count: { wicket: true }, where: { batter: player2, bowler: player1 } }),
			prisma.stats.count({ where: { batter: player2, bowler: player1, score: 4 } }),
			prisma.stats.count({ where: { batter: player2, bowler: player1, score: 6 } }),
			prisma.stats.count({ where: { batter: player1, bowler: player2, wicket: true } })
		]);

	return [
		{
			name: player1,
			runs: player1Stats._sum.score ?? 0,
			balls: player1Stats._count.wicket ?? 0,
			fours: player1Fours ?? 0,
			sixes: player1Sixes ?? 0,
			outs: player1Outs ?? 0
		},
		{
			name: player2,
			runs: player2Stats._sum.score ?? 0,
			balls: player2Stats._count.wicket ?? 0,
			fours: player2Fours ?? 0,
			sixes: player2Sixes ?? 0,
			outs: player2Outs ?? 0
		}
	];
});
