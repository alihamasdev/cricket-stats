"use client";

import { useId } from "react";
import { format } from "date-fns";

import { dates, players as playerList } from "@/data/data.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PlayerField } from "@/components/player-field";

export function InputLabel({ label, ...props }: React.ComponentProps<typeof Input> & { label: string }) {
	const id = useId();
	return (
		<div className="space-y-2">
			<Label htmlFor={id}>{label}</Label>
			<Input id={id} {...props} />
		</div>
	);
}

export function SliderLabel({ label, ...props }: React.ComponentProps<typeof Slider> & { label: string }) {
	const id = useId();
	return (
		<div className="space-y-2">
			<Label htmlFor={id}>{label}</Label>
			<div className="flex items-center gap-x-5">
				<Slider id={id} {...props} />
				<p className="dark:bg-input/30 border-input flex h-9 min-w-10 items-center rounded-md border bg-transparent px-3 py-1 text-sm">
					{props.value}
				</p>
			</div>
		</div>
	);
}

export function PlayerNameField({
	label = "Name",
	value,
	players = playerList,
	...props
}: React.ComponentProps<typeof PlayerField> & { label?: string }) {
	const id = useId();
	return (
		<div className="space-y-2">
			<Label htmlFor={id}>{label}</Label>
			<PlayerField value={value} players={players} {...props}>
				<Button id={id} variant="outline" className="w-full justify-between font-normal capitalize">
					{value ? players?.find((player) => player === value) : ""}
				</Button>
			</PlayerField>
		</div>
	);
}

export function DateSelectField({ label = "Date", children, ...props }: React.ComponentProps<typeof Select> & { label?: string }) {
	const id = useId();
	return (
		<div className="space-y-2">
			<Label htmlFor={id}>{label}</Label>
			<Select {...props}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Select date" />
				</SelectTrigger>
				<SelectContent>
					{children}
					{dates.map(({ date, title }) => (
						<SelectItem key={date} value={date}>
							<span className="font-medium">{title}</span>
							<span className="text-muted-foreground">({format(date, "PP")})</span>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
