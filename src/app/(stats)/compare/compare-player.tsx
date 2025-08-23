"use client";

import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";

import { useStats } from "@/context/stats-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlayerField } from "@/components/player-field";

export function ComparePlayerChanger() {
	const router = useRouter();
	const { players } = useStats();
	const [{ player1, player2 }, setSearchParams] = useQueryStates(
		{
			player1: parseAsString.withDefault(""),
			player2: parseAsString.withDefault("")
		},
		{ history: "push" }
	);

	return (
		<div className="w-full space-y-3">
			<div className="grid grid-cols-[70px_1fr]">
				<Label>Player 1</Label>
				<PlayerField players={players} value={player1} onSelect={(player1) => setSearchParams((prev) => ({ ...prev, player1 }))}>
					<Button variant="outline" className="w-full justify-between font-normal capitalize">
						{player1 ? players.find((player) => player === player1) : ""}
					</Button>
				</PlayerField>
			</div>
			<div className="grid grid-cols-[70px_1fr]">
				<Label>Player 2</Label>
				<PlayerField players={players} value={player2} onSelect={(player2) => setSearchParams((prev) => ({ ...prev, player2 }))}>
					<Button variant="outline" className="w-full justify-between font-normal capitalize">
						{player2 ? players.find((player) => player === player2) : ""}
					</Button>
				</PlayerField>
			</div>
			<Button className="w-full" disabled={!player1 || !player2} onClick={() => router.push(`?player1=${player1}&player2=${player2}`)}>
				Load Stats
			</Button>
		</div>
	);
}
