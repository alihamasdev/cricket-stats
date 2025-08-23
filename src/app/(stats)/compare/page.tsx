import { getComparePlayersStats } from "@/lib/dal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PageProps {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function ComparePage({ searchParams }: PageProps) {
	const { player1, player2 } = await searchParams;
	const stats = await getComparePlayersStats(player1?.toLowerCase(), player2?.toLowerCase());

	return (
		stats && (
			<div className="grid w-full grid-cols-[1.3fr_1.2fr_1.3fr] border p-6 md:grid-cols-[1.4fr_1.1fr_1.4fr]">
				<SingleComparePlayer stats={stats[0]} />
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
				<SingleComparePlayer stats={stats[1]} />
			</div>
		)
	);
}

interface SingleComparePlayerProps {
	stats: { name: string; runs: number; balls: number; fours: number; sixes: number; outs: number };
}

function SingleComparePlayer({ stats }: SingleComparePlayerProps) {
	const strikeRate = (stats.runs / stats.balls) * 100;
	return (
		<div className="flex flex-col items-center space-y-2">
			<Avatar className="size-15 md:size-20">
				<AvatarImage src={`/players/${stats.name}.png`} />
				<AvatarFallback />
			</Avatar>
			<h2 className="text-center text-xl/7 font-semibold capitalize">{stats.name}</h2>
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
