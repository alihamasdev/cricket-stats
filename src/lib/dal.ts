import { calculateBattingStats, calculateBowlingStats, calculateFieldingStats } from "@/lib/calculations";
import { createClient } from "@/lib/supabase/server";
import type { AllTimeStats, BattingStats, BowlingStats, FieldingStats } from "@/lib/types";

export type StatsData = {
	allTimeStats: AllTimeStats[];
	batting: Record<string, BattingStats>[];
	bowling: Record<string, BowlingStats>[];
	fielding: Record<string, FieldingStats>[];
	players: string[];
};

export async function getStats(): Promise<StatsData> {
	const supabase = await createClient();
	const { data, error } = await supabase.from("players").select(`name, batting(*), bowling(*), fielding(*)`);

	if (error) {
		console.log({ statsError: error });
		throw new Error(error.message);
	}

	const allTimeStats = data.map(({ batting, bowling, fielding, name: player }) => ({
		batting: calculateBattingStats(batting, player),
		bowling: calculateBowlingStats(bowling, player),
		fielding: calculateFieldingStats(fielding, player)
	})) satisfies AllTimeStats[];

	const batting = data.map(({ batting }) => {
		return batting.reduce((acc: Record<string, BattingStats>, stat) => {
			acc[stat.date] = stat;
			return acc;
		}, {});
	});

	const bowling = data.map(({ bowling }) =>
		bowling.reduce((acc: Record<string, BowlingStats>, stat) => {
			acc[stat.date] = stat;
			return acc;
		}, {})
	);

	const fielding = data.map(({ fielding }) =>
		fielding.reduce((acc: Record<string, FieldingStats>, stat) => {
			acc[stat.date] = stat;
			return acc;
		}, {})
	);

	const players = data.map(({ name }) => name);

	return { allTimeStats, batting, bowling, fielding, players };
}

export type DatesData = Awaited<ReturnType<typeof getDates>>;

export async function getDates() {
	const supabase = await createClient();
	const { data, error } = await supabase.from("dates").select("*").order("date", { ascending: false });

	if (error) {
		console.log({ dateError: error });
		throw new Error(error.message);
	}

	return data;
}
