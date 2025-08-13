import type { BattingStats, BowlingStats, FieldingStats } from "@/lib/types";

export function calculateBattingStats(stats: BattingStats[], player: string): BattingStats {
	const batting = stats.reduce(
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

	return {
		...batting,
		strike_rate: calculateStrikeRate(batting.runs, batting.balls),
		average: calculateAverage(batting.innings, batting.not_outs, batting.runs),
		date: "",
		id: 1,
		player
	};
}

export function calculateBowlingStats(stats: BowlingStats[], player: string): BowlingStats {
	const bowling = stats.reduce(
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

	const oversString = bowling.overs.toString().split(".");
	const completedOvers = Number(oversString[0]);
	const extraBalls = Number(oversString[1]);

	if (extraBalls >= 6) {
		const remExtraBalls = (extraBalls - 6) * 0.1;
		return { ...bowling, overs: completedOvers + 1 + remExtraBalls, date: "", id: 1, player };
	}

	return { ...bowling, date: "", id: 1, player };
}

export function calculateFieldingStats(stats: FieldingStats[], player: string): FieldingStats {
	const fielding = stats.reduce(
		(acc, stat) => ({
			matches: acc.matches + stat.matches,
			catches: acc.catches + stat.catches,
			run_outs: acc.run_outs + stat.run_outs,
			stumpings: acc.stumpings + stat.stumpings
		}),
		{ matches: 0, catches: 0, run_outs: 0, stumpings: 0 }
	);

	return { ...fielding, date: "", id: 1, player };
}

export function calculateAverage(innings: number, not_outs: number, runs: number) {
	const calcInnings = innings > 0 ? innings - not_outs : 0;
	const average = innings > 0 ? runs / (calcInnings > 0 ? calcInnings : 1) : 0;
	return Math.round(average);
}

export function calculateStrikeRate(runs: number, balls: number) {
	const strikeRate = balls > 0 ? (runs / balls) * 100 : 0;
	return Math.round(strikeRate);
}

export function filterByDate<T>(data: Record<string, T>[], targetDate: string): T[] {
	return data.filter((obj) => targetDate in obj).map((obj) => obj[targetDate]);
}
