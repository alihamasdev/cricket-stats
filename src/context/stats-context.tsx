"use client";

import { createContext, use, useEffect, useState } from "react";

import { filterByDate } from "@/lib/calculations";
import type { DatesData, StatsData } from "@/lib/dal";
import { type Tables } from "@/lib/supabase/database";
import type { BattingStats, BowlingStats, FieldingStats } from "@/lib/types";

interface StatsContextType {
	players: string[];
	battingStats: Tables<"batting">[];
	bowlingStats: Tables<"bowling">[];
	fieldingStats: Tables<"fielding">[];
	dates: DatesData;
	statsDate: string;
	setStatsDate: React.Dispatch<React.SetStateAction<string>>;
}

const StatsContext = createContext<StatsContextType | null>(null);

interface StatsProviderProps {
	statsData: Promise<StatsData>;
	datesData: Promise<DatesData>;
}

export function StatsProvider({ statsData, datesData, ...props }: React.PropsWithChildren<StatsProviderProps>) {
	const dates = use(datesData);
	const { players, allTimeStats, batting, bowling, fielding } = use(statsData);

	const [battingStats, setBattingStats] = useState<BattingStats[]>(() => allTimeStats.map(({ batting }) => batting));
	const [bowlingStats, setBowlingStats] = useState<BowlingStats[]>(() => allTimeStats.map(({ bowling }) => bowling));
	const [fieldingStats, setFieldingStats] = useState<FieldingStats[]>(() =>
		allTimeStats.map(({ fielding }) => fielding)
	);
	const [statsDate, setStatsDate] = useState<string>("");

	useEffect(() => {
		if (statsDate) {
			setBattingStats(() => filterByDate(batting, statsDate));
			setBowlingStats(() => filterByDate(bowling, statsDate));
			setFieldingStats(() => filterByDate(fielding, statsDate));
		} else {
			setBattingStats(() => allTimeStats.map(({ batting }) => batting));
			setBowlingStats(() => allTimeStats.map(({ bowling }) => bowling));
			setFieldingStats(() => allTimeStats.map(({ fielding }) => fielding));
		}
	}, [allTimeStats, batting, bowling, fielding, statsDate]);

	return (
		<StatsContext
			value={{ players, battingStats, bowlingStats, fieldingStats, dates, statsDate, setStatsDate }}
			{...props}
		/>
	);
}

export function useStats(): StatsContextType {
	const stats = use(StatsContext);
	if (!stats) throw new Error("useStats should be used within <DateProvider>");
	return stats;
}
