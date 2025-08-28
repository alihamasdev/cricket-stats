import { getStats } from "@/lib/dal";

import { StatsPage } from "./stats-page";

export default function Page() {
	const stats = getStats();
	return <StatsPage stats={stats} />;
}
