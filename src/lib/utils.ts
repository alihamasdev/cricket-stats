import { clsx, type ClassValue } from "clsx";
import { filter, size, sumBy } from "lodash";
import { twMerge } from "tailwind-merge";

import type { BallStats, CompareStats } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function calculatePlayerStats(name: string, data: BallStats[]): CompareStats {
	const runs = sumBy(data, "score");
	const balls = size(data);
	return {
		name,
		runs,
		balls,
		strikeRate: calculateStrikeRate(runs, balls),
		fours: size(filter(data, { score: 4 })),
		sixes: size(filter(data, { score: 6 })),
		outs: size(filter(data, { wicket: true }))
	};
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
