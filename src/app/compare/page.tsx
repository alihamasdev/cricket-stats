"use client";

import { filter, size, sumBy } from "lodash";
import { parseAsString, useQueryStates } from "nuqs";

import { balls } from "@/data/data.json";
import { PlayerAvatar } from "@/components/ui/avatar";
import { SelectItem } from "@/components/ui/select";
import { DateSelectField, PlayerNameField } from "@/components/label-fields";

function getComparePlayerStats(batter: string, bowler: string, date: string) {
	const data = date !== "all time" ? filter(balls, { batter, bowler, date }) : filter(balls, { batter, bowler });
	return {
		runs: sumBy(data, "score"),
		balls: size(data),
		fours: size(filter(data, { score: 4 })),
		sixes: size(filter(data, { score: 6 })),
		outs: size(filter(data, { wicket: true }))
	};
}

export default function ComparePage() {
	const [{ player1, player2, date }, setSearchParams] = useQueryStates(
		{
			player1: parseAsString.withDefault(""),
			player2: parseAsString.withDefault(""),
			date: parseAsString.withDefault("all time")
		},
		{ history: "push" }
	);
	const player1Stats = getComparePlayerStats(player1, player2, date);
	const player2Stats = getComparePlayerStats(player2, player1, date);

	return (
		<div className="mb-auto w-full max-w-100 space-y-6">
			<h1 className="text-left text-2xl font-bold capitalize md:text-center">Compare Stats</h1>
			<div className="w-full space-y-3">
				<DateSelectField value={date} onValueChange={(value) => setSearchParams((prev) => ({ ...prev, date: value }))}>
					<SelectItem value="all time" className="font-medium">
						All Time
					</SelectItem>
				</DateSelectField>
				<PlayerNameField label="Player 1" value={player1} onSelect={(value) => setSearchParams((prev) => ({ ...prev, player1: value }))} />
				<PlayerNameField label="Player 2" value={player2} onSelect={(value) => setSearchParams((prev) => ({ ...prev, player2: value }))} />
			</div>
			<div className="grid w-full grid-cols-[1.3fr_1.2fr_1.3fr] border p-6 md:grid-cols-[1.4fr_1.1fr_1.4fr]">
				<SingleComparePlayer name={player1} stats={player1Stats} />
				<div className="pt-17 text-center md:pt-22">
					<p className="text-muted-foreground mb-4 text-base/7">vs</p>
					<div className="grid grid-rows-6 gap-y-2 text-sm font-medium md:text-base">
						<p>Runs</p>
						<p>Balls</p>
						<p>Fours</p>
						<p>Sixes</p>
						<p>Strike Rate</p>
						<p>Outs</p>
					</div>
				</div>
				<SingleComparePlayer name={player2} stats={player2Stats} />
			</div>
		</div>
	);
}

interface SingleComparePlayerProps {
	name: string;
	stats: { runs: number; balls: number; fours: number; sixes: number; outs: number };
}

function SingleComparePlayer({ name, stats }: SingleComparePlayerProps) {
	const strikeRate = (stats.runs / stats.balls) * 100;
	return (
		<div className="flex flex-col items-center space-y-2">
			<PlayerAvatar name={name} className="size-15 md:size-20" />
			<h2 className="text-center text-xl/7 font-semibold capitalize">{name || "Player"}</h2>
			<div className="grid grid-rows-6 gap-y-2 pt-2 text-center text-sm md:text-base">
				<p>{stats.runs}</p>
				<p>{stats.balls}</p>
				<p>{stats.fours}</p>
				<p>{stats.sixes}</p>
				<p>{strikeRate ? strikeRate.toFixed(2) : "0.00"}</p>
				<p>{stats.outs}</p>
			</div>
		</div>
	);
}
