import { getDates, getStats } from "@/lib/dal";
import { StatsProvider } from "@/context/stats-context";
import { Footer } from "@/components/footer";

export default function StatsLayout({ children, sheet }: { children: React.ReactNode; sheet: React.ReactNode }) {
	const stats = getStats();
	const dates = getDates();

	return (
		<StatsProvider datesData={dates} statsData={stats}>
			<main className="container mx-auto flex min-h-[calc(100dvh-61px)] w-full flex-col px-4 py-7 sm:px-0">
				{children}
			</main>
			<Footer />
			{sheet}
		</StatsProvider>
	);
}
