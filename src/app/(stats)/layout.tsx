import { StatsProvider } from "@/context/stats-context";

import { getStats } from "@/lib/dal";

export default function Layout({ children }: LayoutProps<"/">) {
	const data = getStats();

	return <StatsProvider data={data}>{children}</StatsProvider>;
}
