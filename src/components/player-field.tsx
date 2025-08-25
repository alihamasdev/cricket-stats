"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { players as playersList } from "@/data/data.json";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface PlayerFieldProps extends React.ComponentProps<typeof CommandItem> {
	value: string;
	players?: string[];
	align?: "center" | "start" | "end";
}

export function PlayerField({ value, players = playersList, align = "center", onSelect, children, ...props }: PlayerFieldProps) {
	const [open, setOpen] = useState(false);
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent className="p-0" align={align}>
				<Command>
					<CommandInput placeholder="Search players..." className="h-9" />
					<CommandList>
						<CommandEmpty>No player found</CommandEmpty>
						<CommandGroup className="overflow-y-auto">
							{players.map((name) => (
								<CommandItem
									key={name}
									value={name}
									onSelect={(value) => {
										onSelect?.(value);
										setOpen(false);
									}}
									{...props}
								>
									<span className="capitalize">{name}</span>
									<Check className={cn("ml-auto", name === value ? "opacity-100" : "opacity-0")} />
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
