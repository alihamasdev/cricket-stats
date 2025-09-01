"use client";

import { Fragment, useState } from "react";
import { RefreshCcw, X } from "lucide-react";

import { type Team } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputLabel, SliderLabel } from "@/components/label-fields";
import { TeamForm } from "@/components/scorecard/team-form";
import { TeamPlayersCard } from "@/components/scorecard/team-players-card";
import { TeamStats } from "@/components/scorecard/team-stats";

export default function Page() {
	const [count, setCount] = useState({ batters: 4, bowlers: 4 });
	const [matchInfo, setMatchInfo] = useState({ title: "Match 01", result: "Match result" });

	const [team1, setTeam1] = useState<Team>({
		name: "Jallo Tigers",
		score: "",
		wickets: "",
		overs: "04",
		allOut: false,
		players: ["Muhammad Ali", "Hamas", "Hamza", "Khizar", "Ahad"],
		batters: [
			{ name: "", runs: "", balls: "", out: true },
			{ name: "", runs: "", balls: "", out: true },
			{ name: "", runs: "", balls: "", out: true },
			{ name: "", runs: "", balls: "", out: true }
		],
		bowlers: [
			{ name: "", runs: "", wickets: "", overs: "1.0" },
			{ name: "", runs: "", wickets: "", overs: "1.0" },
			{ name: "", runs: "", wickets: "", overs: "1.0" },
			{ name: "", runs: "", wickets: "", overs: "1.0" }
		]
	});

	const [team2, setTeam2] = useState<Team>({
		name: "Mughalpura Warriors",
		score: "",
		wickets: "",
		overs: "04",
		allOut: false,
		players: ["Nadeem", "Muneeb", "Asad", "Waleed", "Ahsan", "Saqib"],
		batters: [
			{ name: "", runs: "", balls: "", out: true },
			{ name: "", runs: "", balls: "", out: true },
			{ name: "", runs: "", balls: "", out: true },
			{ name: "", runs: "", balls: "", out: true }
		],
		bowlers: [
			{ name: "", runs: "", wickets: "", overs: "1.0" },
			{ name: "", runs: "", wickets: "", overs: "1.0" },
			{ name: "", runs: "", wickets: "", overs: "1.0" },
			{ name: "", runs: "", wickets: "", overs: "1.0" }
		]
	});

	return (
		<Fragment>
			<h1 className="w-full text-left text-2xl font-bold capitalize">Match Scorecard</h1>
			<section
				style={{ backgroundImage: "url(/lords.png)" }}
				className="relative flex aspect-video w-full items-center justify-center rounded bg-center bg-no-repeat object-cover py-25"
			>
				<div className="relative z-1 grid grid-cols-2 gap-3" style={{ width: 1000 }}>
					<div className="bg-gradient-end col-span-2 mx-auto h-11 w-fit rounded-full px-8 text-white">
						<span className="text-lg/11 font-bold uppercase">{matchInfo.title}</span>
					</div>
					<div className="text-gradient-end h-15 rounded-full bg-white text-center">
						<span className="text-2xl/15 font-bold uppercase">{team1.name}</span>
					</div>
					<div className="text-gradient-end h-15 rounded-full bg-white text-center">
						<span className="text-2xl/15 font-bold uppercase">{team2.name}</span>
					</div>
					<TeamStats team1={team1} team2={team2} className="ml-10" count={count} />
					<TeamStats team1={team2} team2={team1} className="mr-10" count={count} />
					<div className="text-gradient-end col-span-2 h-15 w-full rounded-full bg-white text-center">
						<span className="text-2xl/15 font-bold uppercase">{matchInfo.result}</span>
					</div>
				</div>
				<div className="absolute inset-0 z-0 bg-black/30" />
			</section>

			<div className="my-5 flex items-center justify-center gap-x-4">
				<Button
					variant="outline"
					onClick={() => {
						setTeam1(team2);
						setTeam2(team1);
					}}
				>
					<RefreshCcw />
					Swap Team
				</Button>
			</div>

			<section className="grid w-full grid-cols-2 gap-5">
				<Card>
					<CardHeader>
						<CardTitle>Match Info</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<InputLabel
							label="Title"
							value={matchInfo.title}
							onChange={(e) => setMatchInfo((prev) => ({ ...prev, title: e.target.value }))}
						/>
						<InputLabel
							label="Result"
							value={matchInfo.result}
							onChange={(e) => setMatchInfo((prev) => ({ ...prev, result: e.target.value }))}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Canvas Setting</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<SliderLabel
							label="Batters"
							min={1}
							max={11}
							value={[count.batters]}
							onValueChange={(value) => setCount((prev) => ({ ...prev, batters: value[0] }))}
						/>
						<SliderLabel
							label="Bowlers"
							min={1}
							max={11}
							value={[count.bowlers]}
							onValueChange={(value) => setCount((prev) => ({ ...prev, bowlers: value[0] }))}
						/>
					</CardContent>
				</Card>

				<TeamPlayersCard title="Team 1" team={team1} setTeamAction={setTeam1} />
				<TeamPlayersCard title="Team 2" team={team2} setTeamAction={setTeam2} />

				<Card className="col-span-2">
					<CardHeader>
						<CardTitle>Stats</CardTitle>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="team1" className="col-span-2 w-full">
							<div className="flex w-full justify-center">
								<TabsList className="w-full">
									<TabsTrigger value="team1" className="capitalize">
										{team1.name || "Team 1"}
									</TabsTrigger>
									<TabsTrigger value="team2" className="capitalize">
										{team2.name || "Team 2"}
									</TabsTrigger>
								</TabsList>
							</div>
							<TabsContent value="team1">
								<TeamForm team={team1} setTeamAction={setTeam1} />
							</TabsContent>
							<TabsContent value="team2">
								<TeamForm team={team2} setTeamAction={setTeam2} />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</section>
		</Fragment>
	);
}
