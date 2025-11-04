import { getBattingStats, getBowlingStats, getDates } from "@/lib/dal";
import { loadSearchParams } from "@/lib/utils";
import { battingColumns, bowlingColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";

export default async function BattingStatsPage({ searchParams }: PageProps<"/">) {
	const [{ date, type }, dates] = await Promise.all([await loadSearchParams(searchParams), getDates()]);

	if (type === "bowling") {
		const data = await getBowlingStats(date);
		return (
			<DataTable columns={bowlingColumns} data={data} dates={dates}>
				<h1 className="text-xl/9 font-bold">Bowling Stats</h1>
			</DataTable>
		);
	}

	const data = await getBattingStats(date);
	return (
		<DataTable columns={battingColumns} data={data} dates={dates}>
			<h1 className="text-xl/9 font-bold">Batting Stats</h1>
		</DataTable>
	);
}
