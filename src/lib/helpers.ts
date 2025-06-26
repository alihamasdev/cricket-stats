import { type Tables } from "@/lib/supabase/database";

type BattingStats = Omit<Tables<"batting">, "id" | "player" | "date">;
export type FullBattingStats = BattingStats & { average: number; strike_rate: number };
export type PlayerBattingStats = FullBattingStats & { name: string };

export function calculateBattingStats(stats: BattingStats[]): FullBattingStats {
	const battingStats = stats.reduce(
		(acc, stat) => ({
			matches: acc.matches + stat.matches,
			innings: acc.innings + stat.innings,
			balls: acc.balls + stat.balls,
			runs: acc.runs + stat.runs,
			sixes: acc.sixes + stat.sixes,
			fours: acc.fours + stat.fours,
			ducks: acc.ducks + stat.ducks
		}),
		{ matches: 0, innings: 0, balls: 0, runs: 0, sixes: 0, fours: 0, ducks: 0 }
	);

	const { innings, runs, balls } = battingStats;
	const average = innings > 0 ? runs / innings : 0.0;
	const strike_rate = runs > 0 ? (runs / balls) * 100 : 0.0;

	return { average: Number(average.toFixed(2)), strike_rate: Number(strike_rate.toFixed(2)), ...battingStats };
}

type BowlingStats = Omit<Tables<"bowling">, "id" | "player" | "date">;
export type FullBowlingStats = BowlingStats & { economy: number; strike_rate: number };
export type PlayerBowlingStats = FullBowlingStats & { name: string };

export function calculateBowlingStats(stats: BowlingStats[]): FullBowlingStats {
	const bowlingStats = stats.reduce(
		(acc, stat) => ({
			matches: acc.matches + stat.matches,
			overs: acc.overs + stat.overs,
			wickets: acc.wickets + stat.wickets,
			runs: acc.runs + stat.runs,
			dots: acc.dots + stat.dots,
			wides: acc.wides + stat.wides,
			no_balls: acc.no_balls + stat.no_balls
		}),
		{ matches: 0, overs: 0, wickets: 0, runs: 0, dots: 0, wides: 0, no_balls: 0 }
	);

	const { overs, runs } = bowlingStats;
	const economy = overs > 0 ? runs / overs : 0.0;
	const strike_rate = overs > 0 ? runs / (overs * 6) : 0.0;

	return { economy: Number(economy.toFixed(2)), strike_rate: Number(strike_rate.toFixed(2)), ...bowlingStats };
}

export type FullFieldingStats = Omit<Tables<"fielding">, "id" | "player" | "date">;
export type PlayerFieldingStats = FullFieldingStats & { name: string };

export function calculateFieldingStats(stats: FullFieldingStats[]): FullFieldingStats {
	return stats.reduce(
		(acc, stat) => ({
			matches: acc.matches + stat.matches,
			catches: acc.catches + stat.catches,
			run_outs: acc.run_outs + stat.run_outs,
			stumpings: acc.stumpings + stat.stumpings
		}),
		{ matches: 0, catches: 0, run_outs: 0, stumpings: 0 }
	);
}
