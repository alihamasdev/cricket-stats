import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { type Team } from "@/components/scorecard/types";

interface TeamStatsProps extends React.ComponentProps<"div"> {
	team1: Team;
	team2: Team;
	count: { batters: number; bowlers: number };
}

export function TeamStats({ team1, team2, count, className, style, ...props }: TeamStatsProps) {
	const team1Color = "#D2D628";
	const team2Color = "#80B2D0";

	return (
		<div className={cn("overflow-hidden rounded-xl bg-white text-base/9", className)} {...props}>
			<div className="overflow-hidden text-black" style={{ height: `${43 + count.batters * 36}px` }}>
				<StatsHeader icon="bat" backgroundColor={team1Color} title={team1.allOut ? team1.score : `${team1.score}-${team1.wickets}`} />
				{team1.batters.map(({ name, balls, runs, out }, idx) => (
					<div key={idx} className="grid h-9 grid-cols-[1fr_60px_60px] divide-x divide-black/50 border-b border-black/50">
						<p className="text-gradient-end pl-3 text-left font-medium uppercase">{name}</p>
						<p className="text-gradient-end text-center font-bold">
							{runs}
							{!out && "*"}
						</p>
						<p className="text-gradient-end/80 text-center">{balls}</p>
					</div>
				))}
			</div>

			<div className="overflow-hidden text-black" style={{ height: `${43 + count.bowlers * 36}px` }}>
				<StatsHeader icon="ball" title={team1.overs} backgroundColor={team2Color} />
				{team2.bowlers.map(({ name, wickets, runs, overs }, idx) => (
					<div key={idx} className="grid h-9 grid-cols-[1fr_60px_60px] divide-x divide-black/50 border-b border-black/50">
						<p className="text-gradient-end pl-3 text-left font-medium uppercase">{name}</p>
						<p className="text-gradient-end text-center font-bold">{`${wickets}-${runs}`}</p>
						<p className="text-gradient-end/80 text-center">{overs}</p>
					</div>
				))}
			</div>
		</div>
	);
}

function StatsHeader({ backgroundColor, title, icon }: { backgroundColor: string; title: string; icon: "bat" | "ball" }) {
	return (
		<div className="from-gradient-start to-gradient-end relative ml-5 h-11 w-full items-center bg-linear-to-r">
			<Avatar className="absolute top-1/2 -left-5 size-11 -translate-y-1/2 border-3 border-white p-2" style={{ backgroundColor }}>
				<AvatarImage src={`${icon}.svg`} />
			</Avatar>
			<p className="w-full text-center text-2xl/11 font-bold text-white">{title}</p>
		</div>
	);
}
