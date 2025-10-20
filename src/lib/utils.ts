import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
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

export function ballsToOvers(balls: number) {
	if (balls <= 0) return 0;
	const completedOvers = Math.floor(balls / 6);
	const remainingBalls = balls % 6;
	return Number(`${completedOvers}.${remainingBalls}`);
}
