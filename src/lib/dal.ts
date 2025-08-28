import { cache } from "react";
import { groupBy, map, reduce } from "lodash";

import { createClient } from "@/lib/supabase/server";
import type { BattingStats, BowlingStats, FieldingStats } from "@/lib/types";
import { calculateAverage, calculateStrikeRate } from "@/lib/utils";

export type StatsReturn = {
	batting: Record<string, BattingStats[]>;
	bowling: Record<string, BowlingStats[]>;
	fielding: Record<string, FieldingStats[]>;
};

export const getStats = cache(async (): Promise<StatsReturn> => {
	const supabase = await createClient();
	const [batting, bowling, fielding] = await Promise.all([
		supabase.from("batting").select(`*`),
		supabase.from("bowling").select(`*`),
		supabase.from("fielding").select(`*`)
	]);

	if (batting.error || bowling.error || fielding.error) {
		throw new Error("Something went wrong while fetching data");
	}

	const battingRecords: Record<string, BattingStats[]> = groupBy(batting.data, "date");
	const bowlingRecords: Record<string, BowlingStats[]> = groupBy(bowling.data, "date");
	const fieldingRecords: Record<string, FieldingStats[]> = groupBy(fielding.data, "date");

	const groupBattingPlayers = groupBy(batting.data, "player");

	const allTimeBatting = map(groupBattingPlayers, (records, player) => {
		const summed = reduce(
			records,
			(acc, record) => ({
				runs: acc.runs + record.runs,
				balls: acc.balls + record.balls,
				sixes: acc.sixes + record.sixes,
				fours: acc.fours + record.fours,
				ducks: acc.ducks + record.ducks,
				innings: acc.innings + record.innings,
				matches: acc.matches + record.matches,
				not_outs: acc.not_outs + record.not_outs
			}),
			{ runs: 0, balls: 0, sixes: 0, fours: 0, ducks: 0, innings: 0, matches: 0, not_outs: 0 }
		);

		return {
			...summed,
			id: 0,
			player,
			date: "all-time",
			average: calculateAverage(summed.innings, summed.not_outs, summed.runs),
			strike_rate: calculateStrikeRate(summed.runs, summed.balls)
		};
	});

	const groupBowlingPlayers = groupBy(bowling.data, "player");

	const allTimeBowling = map(groupBowlingPlayers, (records, player) => {
		const summed = reduce(
			records,
			(acc, record) => ({
				matches: acc.matches + record.matches,
				innings: acc.innings + record.innings,
				overs: acc.overs + record.overs,
				wickets: acc.wickets + record.wickets,
				runs: acc.runs + record.runs,
				dots: acc.dots + record.dots,
				no_balls: acc.no_balls + record.no_balls,
				wides: acc.wides + record.wides
			}),
			{ wickets: 0, dots: 0, innings: 0, matches: 0, no_balls: 0, overs: 0, runs: 0, wides: 0 }
		);

		return {
			id: 0,
			player,
			date: "all-time",
			wickets: summed.wickets,
			dots: summed.dots,
			innings: summed.innings,
			matches: summed.matches,
			no_balls: summed.no_balls,
			overs: summed.overs,
			runs: summed.runs,
			wides: summed.wides
		};
	});

	const groupFieldingPlayers = groupBy(fielding.data, "player");

	const allTimeFielding = map(groupFieldingPlayers, (records, player) => {
		const summed = reduce(
			records,
			(acc, record) => ({
				matches: acc.matches + record.matches,
				catches: acc.catches + record.catches,
				run_outs: acc.run_outs + record.run_outs,
				stumpings: acc.stumpings + record.stumpings
			}),
			{ catches: 0, matches: 0, run_outs: 0, stumpings: 0 }
		);

		return {
			id: 0,
			player,
			date: "all-time",
			catches: summed.catches,
			matches: summed.matches,
			run_outs: summed.run_outs,
			stumpings: summed.stumpings
		};
	});

	return {
		batting: { ...battingRecords, "all-time": allTimeBatting },
		bowling: { ...bowlingRecords, "all-time": allTimeBowling },
		fielding: { ...fieldingRecords, "all-time": allTimeFielding }
	};
});
