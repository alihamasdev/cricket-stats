import { cacheLife } from "next/cache";
import { groupBy, map, reduce } from "lodash";

import { createClient } from "@/lib/supabase/anon";
import type { BattingStats, BowlingStats } from "@/lib/types";
import { ballsToOvers } from "@/lib/utils";

export async function getBattingStats(date?: string | null): Promise<BattingStats[]> {
	"use cache";
	cacheLife("days");

	const supabase = createClient();
	const { data, error } = date ? await supabase.from("batting").select("*").eq("date", date) : await supabase.from("batting").select("*");

	if (error) {
		throw new Error(error.message);
	}

	const groupedStats = groupBy(data, "player");

	return map(groupedStats, (records, player) => {
		const sum = reduce(
			records,
			(acc, record) => ({
				runs: acc.runs + record.runs,
				balls: acc.balls + record.balls,
				sixes: acc.sixes + record.sixes,
				fours: acc.fours + record.fours,
				ducks: acc.ducks + record.ducks,
				innings: acc.innings + record.innings,
				not_outs: acc.not_outs + record.not_outs
			}),
			{ runs: 0, balls: 0, sixes: 0, fours: 0, ducks: 0, innings: 0, not_outs: 0 }
		);

		return {
			...sum,
			player,
			average: sum.innings - sum.not_outs > 0 ? Number((sum.runs / (sum.innings - sum.not_outs)).toFixed()) : sum.runs,
			strike_rate: sum.balls > 0 ? Number(((sum.runs / sum.balls) * 100).toFixed()) : 0
		};
	});
}

export async function getBowlingStats(date?: string | null): Promise<BowlingStats[]> {
	"use cache";
	cacheLife("days");

	const supabase = createClient();
	const { data, error } = date ? await supabase.from("bowling").select("*").eq("date", date) : await supabase.from("bowling").select("*");

	if (error) {
		throw new Error(error.message);
	}

	const groupedStats = groupBy(data, "player");

	return map(groupedStats, (records, player) => {
		const sum = reduce(
			records,
			(acc, record) => ({
				innings: acc.innings + record.innings,
				balls: acc.balls + record.balls,
				wickets: acc.wickets + record.wickets,
				runs: acc.runs + record.runs,
				dots: acc.dots + record.dots,
				no_balls: acc.no_balls + record.no_balls,
				wides: acc.wides + record.wides
			}),
			{ wickets: 0, dots: 0, innings: 0, no_balls: 0, balls: 0, runs: 0, wides: 0 }
		);

		return {
			...sum,
			player,
			balls: ballsToOvers(sum.balls),
			average: sum.wickets > 0 ? Number((sum.runs / sum.wickets).toFixed(1)) : sum.runs,
			strike_rate: Number((sum.runs / (sum.balls ?? 0)).toFixed(2))
		};
	});
}

export async function getDates() {
	"use cache";
	cacheLife("days");

	const supabase = createClient();
	const { data, error } = await supabase.from("dates").select("*");

	if (error) {
		throw new Error(error.message);
	}

	return data;
}
