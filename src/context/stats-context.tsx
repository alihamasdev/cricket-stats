"use client";

import { createContext, use } from "react";

import { type StatsData } from "@/lib/types";

const StatsContext = createContext<StatsData | null>(null);

export function StatsProvider({ children, data }: { children: React.ReactNode; data: Promise<StatsData> }) {
	const stats = use(data);

	return <StatsContext value={stats}>{children}</StatsContext>;
}

export function useStats() {
	const stats = use(StatsContext);
	if (!stats) {
		throw new Error("useStats must use within `<StatsProvider />`");
	}
	return stats;
}
