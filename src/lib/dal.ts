import { cacheLife } from "next/cache";
import _ from "lodash";

import { createClient } from "@/lib/supabase/anon";
import type { BattingStats, BowlingStats } from "@/lib/types";
import { ballsToOvers } from "@/lib/utils";

export async function getBattingStats(dates?: string[] | null): Promise<BattingStats[]> {
	"use cache";
	cacheLife("days");

	const supabase = createClient();
	const datesArray = dates?.filter(Boolean) ?? [];

	let data: BattingStats[] = [];

	if (datesArray.length > 1) {
		const results = await Promise.all(
			datesArray.map((date) => supabase.rpc("get_batting_stats", { date_filter: date }).then(({ data }) => data))
		);
		const flattened = results.flat().filter(Boolean) as BattingStats[];

		data = Object.values(_.groupBy(flattened, "player")).map((stats) => {
			const player = stats[0].player;
			const innings = _.sumBy(stats, "innings");
			const runs = _.sumBy(stats, "runs");
			const balls = _.sumBy(stats, "balls");
			const not_outs = _.sumBy(stats, "not_outs");

			const average = innings - not_outs === 0 ? 0 : runs / (innings - not_outs);
			const strike_rate = balls === 0 ? 0 : (runs / balls) * 100;

			return {
				player,
				innings,
				runs,
				balls,
				not_outs,
				fours: _.sumBy(stats, "fours"),
				sixes: _.sumBy(stats, "sixes"),
				ducks: _.sumBy(stats, "ducks"),
				fifties: _.sumBy(stats, "fifties"),
				hundreds: _.sumBy(stats, "hundreds"),
				average,
				strike_rate
			};
		});
	} else {
		const { data: result, error } = await supabase.rpc("get_batting_stats", { date_filter: datesArray[0] ?? null });
		if (error) throw new Error(error.message);
		data = result;
	}

	return data;
}

export async function getBowlingStats(dates?: string[] | null): Promise<BowlingStats[]> {
	"use cache";
	cacheLife("days");

	const supabase = createClient();
	const datesArray = dates?.filter(Boolean) ?? [];

	let data: BowlingStats[] = [];

	if (datesArray.length > 1) {
		const results = await Promise.all(
			datesArray.map((date) => supabase.rpc("get_bowling_stats", { date_filter: date }).then(({ data }) => data))
		);
		const flattened = results.flat().filter(Boolean) as BowlingStats[];

		data = Object.values(_.groupBy(flattened, "player")).map((stats) => {
			const player = stats[0].player;
			const innings = _.sumBy(stats, "innings");
			const balls = _.sumBy(stats, "balls");
			const wickets = _.sumBy(stats, "wickets");
			const runs = _.sumBy(stats, "runs");

			const strike_rate = balls === 0 ? 0 : runs / balls;

			const average = wickets === 0 ? 0 : runs / wickets;

			return {
				player,
				innings,
				balls,
				wickets,
				runs,
				dots: _.sumBy(stats, "dots"),
				wides: _.sumBy(stats, "wides"),
				no_balls: _.sumBy(stats, "no_balls"),
				"2fr": _.sumBy(stats, "2fr"),
				"3fr": _.sumBy(stats, "3fr"),
				average,
				strike_rate
			};
		});
	} else {
		const { data: result, error } = await supabase.rpc("get_bowling_stats", { date_filter: datesArray[0] ?? null });
		if (error) throw new Error(error.message);
		data = result;
	}

	return data.map((stat) => ({
		...stat,
		balls: ballsToOvers(stat.balls),
		strike_rate: Number((stat.strike_rate * 6).toFixed(1))
	}));
}

export async function getDates() {
	"use cache";
	cacheLife("days");

	const supabase = createClient();
	const { data, error } = await supabase.from("dates").select("*");

	if (error) throw new Error(error.message);

	return data;
}
