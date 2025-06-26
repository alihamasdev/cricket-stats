"use client";

import { Fragment } from "react";
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useQueryState } from "nuqs";

import type { PlayerBattingStats, PlayerBowlingStats, PlayerFieldingStats } from "@/lib/helpers";
import { DataTable } from "@/components/table/data-table";
import { TableHeader } from "@/components/table/table-header";

import { battingColumns, bowlingColumns, fieldingColumns } from "./columns";

interface StatsTableProps {
	data: { batting: PlayerBattingStats; bowling: PlayerBowlingStats; fielding: PlayerFieldingStats }[];
}

export function StatsTable({ data }: StatsTableProps) {
	const [stats] = useQueryState("type", { defaultValue: "batting" });

	if (stats === "bowling") {
		return <BowlingTable data={data.map(({ bowling }) => bowling)} />;
	}

	if (stats === "fielding") {
		return <FieldingTable data={data.map(({ fielding }) => fielding)} />;
	}

	return <BattingTable data={data.map(({ batting }) => batting)} />;
}

function BattingTable({ data }: { data: PlayerBattingStats[] }) {
	const table = useReactTable({
		data,
		columns: battingColumns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	});

	return (
		<Fragment>
			<TableHeader table={table} />
			<DataTable table={table} />
		</Fragment>
	);
}

function BowlingTable({ data }: { data: PlayerBowlingStats[] }) {
	const table = useReactTable({
		data,
		columns: bowlingColumns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	});

	return (
		<Fragment>
			<TableHeader table={table} />
			<DataTable table={table} />
		</Fragment>
	);
}

function FieldingTable({ data }: { data: PlayerFieldingStats[] }) {
	const table = useReactTable({
		data,
		columns: fieldingColumns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	});

	return (
		<Fragment>
			<TableHeader table={table} />
			<DataTable table={table} />
		</Fragment>
	);
}
