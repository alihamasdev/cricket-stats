import { getDates, getStats } from "@/lib/dal";
import { StatsProvider } from "@/context/stats-context";

export default function StatsLayout({ children }: { children: React.ReactNode }) {
	const stats = getStats();
	const dates = getDates();

	return (
		<StatsProvider datesData={dates} statsData={stats}>
			{children}
		</StatsProvider>
	);
}
