"use client";

import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { InputLabel, PlayerNameField } from "@/components/label-fields";
import type { BattingPlayer, BowlingPlayer, Team } from "@/components/scorecard/types";

interface TeamFormProps {
	team: Team;
	setTeamAction: React.Dispatch<React.SetStateAction<Team>>;
}

export function TeamForm({ team, setTeamAction }: TeamFormProps) {
	const updateBatter = (index: number, field: keyof BattingPlayer, value: string | boolean) => {
		setTeamAction((prev) => ({
			...prev,
			batters: prev.batters.map((player, i) => (i === index ? { ...player, [field]: value } : player))
		}));
	};

	const updateBowler = (index: number, field: keyof BowlingPlayer, value: string) => {
		setTeamAction((prev) => ({
			...prev,
			bowlers: prev.bowlers.map((player, i) => (i === index ? { ...player, [field]: value } : player))
		}));
	};

	return (
		<div className="mt-4 flex flex-col gap-4">
			<div className="grid grid-cols-4 items-end gap-4">
				<InputLabel
					type="number"
					label="Score"
					value={team.score}
					onChange={(e) => setTeamAction((prev) => ({ ...prev, score: e.target.value }))}
				/>
				<InputLabel
					type="number"
					label="Wickets"
					value={team.wickets}
					onChange={(e) => setTeamAction((prev) => ({ ...prev, wickets: e.target.value }))}
				/>
				<InputLabel
					type="number"
					label="Overs"
					value={team.overs}
					onChange={(e) => setTeamAction((prev) => ({ ...prev, overs: e.target.value }))}
				/>
				<Toggle pressed={team.allOut} onPressedChange={(value) => setTeamAction((prev) => ({ ...prev, allOut: value }))}>
					All Out
				</Toggle>
			</div>

			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<h2 className="text-xl/9 font-bold">Batters</h2>
					<Button
						size="sm"
						onClick={() => setTeamAction((p) => ({ ...p, batters: [...p.batters, { name: "", balls: "", runs: "", out: true }] }))}
					>
						<Plus />
						Add Batter
					</Button>
				</div>
				<Separator />
				{team.batters.map(({ name, balls, runs, out }, index) => (
					<div key={index} className="grid grid-cols-[1fr_1fr_1fr_1fr_36px] items-end gap-4">
						<PlayerNameField value={name} players={team.players} onSelect={(value) => updateBatter(index, "name", value)} />
						<InputLabel label="Runs" value={runs} onChange={(e) => updateBatter(index, "runs", e.target.value)} />
						<InputLabel label="Balls" value={balls} onChange={(e) => updateBatter(index, "balls", e.target.value)} />
						<Toggle pressed={out} onPressedChange={(value) => updateBatter(index, "out", value)}>
							{out ? "Out" : "Not Out"}
						</Toggle>
						<Button
							size="icon"
							variant="secondary"
							onClick={() => setTeamAction((p) => ({ ...p, batters: p.batters.filter((_, idx) => index !== idx) }))}
						>
							<X />
						</Button>
					</div>
				))}
			</div>

			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<h2 className="text-xl/9 font-bold">Bowlers</h2>
					<Button
						size="sm"
						onClick={() => setTeamAction((p) => ({ ...p, bowlers: [...p.bowlers, { name: "", runs: "", wickets: "0", overs: "1.0" }] }))}
					>
						<Plus />
						Add Bowler
					</Button>
				</div>
				<Separator />
				{team.bowlers.map(({ name, overs, runs, wickets }, index) => (
					<div key={index} className="grid grid-cols-[1fr_1fr_1fr_1fr_36px] items-end gap-4">
						<PlayerNameField value={name} players={team.players} onSelect={(value) => updateBowler(index, "name", value)} />
						<InputLabel label="Runs" value={runs} onChange={(e) => updateBowler(index, "runs", e.target.value)} />
						<InputLabel label="Wickets" value={wickets} onChange={(e) => updateBowler(index, "wickets", e.target.value)} />
						<InputLabel label="Overs" value={overs} onChange={(e) => updateBowler(index, "overs", e.target.value)} />
						<Button
							size="icon"
							variant="secondary"
							onClick={() => setTeamAction((p) => ({ ...p, bowlers: p.bowlers.filter((_, idx) => index !== idx) }))}
						>
							<X />
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}
