import { clsx, type ClassValue } from "clsx";
import { createLoader, parseAsString } from "nuqs/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function ballsToOvers(balls: number) {
	if (balls <= 0) return 0;
	const completedOvers = Math.floor(balls / 6);
	const remainingBalls = balls % 6;
	return Number(`${completedOvers}.${remainingBalls}`);
}

export const dateSearchParams = parseAsString.withOptions({ shallow: false, scroll: true });
export const typeSearchParams = parseAsString.withDefault("batting").withOptions({ shallow: false, scroll: true });

export const loadSearchParams = createLoader({ date: dateSearchParams, type: typeSearchParams });
