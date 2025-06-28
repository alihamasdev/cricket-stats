import type { BattingStats, BowlingStats, FieldingStats } from "@/lib/types";

export function calculateBattingStats(stats: BattingStats[]): Omit<BattingStats, "player" | "date" | "id"> {
	return stats.reduce(
		(acc, stat) => ({
			matches: acc.matches + stat.matches,
			innings: acc.innings + stat.innings,
			balls: acc.balls + stat.balls,
			runs: acc.runs + stat.runs,
			sixes: acc.sixes + stat.sixes,
			fours: acc.fours + stat.fours,
			ducks: acc.ducks + stat.ducks,
			not_outs: acc.not_outs + stat.not_outs
		}),
		{ matches: 0, innings: 0, balls: 0, runs: 0, sixes: 0, fours: 0, ducks: 0, not_outs: 0 }
	);
}

export function calculateBowlingStats(stats: BowlingStats[]): Omit<BowlingStats, "player" | "date" | "id"> {
	return stats.reduce(
		(acc, stat) => ({
			matches: acc.matches + stat.matches,
			innings: acc.innings + stat.innings,
			overs: acc.overs + stat.overs,
			wickets: acc.wickets + stat.wickets,
			runs: acc.runs + stat.runs,
			dots: acc.dots + stat.dots,
			wides: acc.wides + stat.wides,
			no_balls: acc.no_balls + stat.no_balls
		}),
		{ matches: 0, innings: 0, overs: 0, wickets: 0, runs: 0, dots: 0, wides: 0, no_balls: 0 }
	);
}

export function calculateFieldingStats(stats: FieldingStats[]): Omit<FieldingStats, "player" | "date" | "id"> {
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

export function filterByDate<T>(data: Record<string, T>[], targetDate: string): T[] {
	return data.filter((obj) => targetDate in obj).map((obj) => obj[targetDate]);
}
