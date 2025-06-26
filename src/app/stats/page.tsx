import { calculateBattingStats, calculateBowlingStats, calculateFieldingStats } from "@/lib/helpers";
import { createClient } from "@/lib/supabase/server";

import { StatsTable } from "./table";

async function getData() {
	const supabase = await createClient();
	const { data, error } = await supabase.from("players").select(`
			name,
			batting(matches, innings, balls, runs, sixes, fours, ducks),
			bowling(matches, runs, overs, wickets, dots, wides, no_balls),
			fielding(matches, catches, run_outs, stumpings)
			`);
	if (error) throw new Error(error.message);

	return data.map(({ name, batting, bowling, fielding }) => ({
		batting: { name, ...calculateBattingStats(batting) },
		bowling: { name, ...calculateBowlingStats(bowling) },
		fielding: { name, ...calculateFieldingStats(fielding) }
	}));
}

export default async function BattingPage() {
	const data = await getData();

	return (
		<main className="container mx-auto flex min-h-dvh w-full flex-col px-4 py-5 sm:px-0">
			<StatsTable data={data} />
		</main>
	);
}
