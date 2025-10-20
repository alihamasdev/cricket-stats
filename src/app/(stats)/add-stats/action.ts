"use server";

import type { z } from "zod";

import type { TablesInsert } from "@/lib/supabase/database";
import { createClient } from "@/lib/supabase/server";
import { calculateAverage, calculateStrikeRate } from "@/lib/utils";
import { statsSchema } from "@/lib/validation";

export async function addStatsAction(data: z.infer<typeof statsSchema>) {
	const supabase = await createClient();
	const { success } = statsSchema.safeParse(data);
	if (!success) return { error: "Please provide valid data" };

	const { name: player, date, matches, batting, bowling, fielding } = data;

	const battingStats = {
		player,
		date,
		matches: Number(matches),
		innings: Number(batting.innings),
		runs: Number(batting.runs),
		balls: Number(batting.balls),
		ducks: Number(batting.ducks),
		fours: Number(batting.fours),
		sixes: Number(batting.sixes),
		not_outs: Number(batting.not_outs),
		strike_rate: calculateStrikeRate(Number(batting.runs), Number(batting.balls)),
		average: calculateAverage(Number(batting.innings), Number(batting.not_outs), Number(batting.runs))
	} satisfies TablesInsert<"batting">;

	const bowlingStats = {
		player,
		date,
		matches: Number(matches),
		innings: Number(bowling.innings),
		dots: Number(bowling.dots),
		no_balls: Number(bowling.no_balls),
		balls: Number(bowling.overs),
		runs: Number(bowling.runs),
		wickets: Number(bowling.wickets),
		wides: Number(bowling.wides)
	} satisfies TablesInsert<"bowling">;

	const fieldingStats = {
		player,
		date,
		matches: Number(matches),
		catches: Number(fielding.catches),
		run_outs: Number(fielding.run_outs),
		stumpings: Number(fielding.stumpings)
	} satisfies TablesInsert<"fielding">;

	const [{ error: battingError }, { error: bowlingError }, { error: fieldingError }] = await Promise.all([
		supabase.from("batting").insert(battingStats),
		supabase.from("bowling").insert(bowlingStats),
		supabase.from("fielding").insert(fieldingStats)
	]);

	if (battingError) {
		console.error(battingError);
		return { error: `Batting error: ${battingError.message}` };
	}
	if (bowlingError) {
		console.error(bowlingError);
		return { error: `Bowling error: ${bowlingError.message}` };
	}
	if (fieldingError) {
		console.error(fieldingError);
		return { error: `Fielding error: ${fieldingError.message}` };
	}

	return { error: null };
}
