import { getDates, getStats } from "@/lib/dal";
import { StatsProvider } from "@/context/stats-context";

export default function StatsLayout({ children, sheet }: { children: React.ReactNode; sheet: React.ReactNode }) {
	const stats = getStats();
	const dates = getDates();

	return (
		<StatsProvider datesData={dates} statsData={stats}>
			<main className="container mx-auto flex min-h-dvh w-full flex-col px-4 py-5 sm:px-0">{children}</main>
			{sheet}
		</StatsProvider>
	);
}
