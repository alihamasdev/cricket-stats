"use client";

import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export function PlayerNameField({ value, players, ...props }: React.ComponentProps<typeof PlayerField>) {
	const id = useId();
	return (
		<div className="space-y-2">
			<Label htmlFor={id}>Name</Label>
			<PlayerField value={value} players={players} {...props}>
				<Button id={id} variant="outline" className="w-full justify-between font-normal capitalize">
					{value ? players?.find((player) => player === value) : ""}
				</Button>
			</PlayerField>
		</div>
	);
}
