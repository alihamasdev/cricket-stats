"use client";

import { Fragment, useState } from "react";
import { Check } from "lucide-react";
import { type UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";
import { StatsSchema } from "@/lib/validation";
import { useStats } from "@/context/stats-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function PlayerNameField({ form }: { form: UseFormReturn<StatsSchema, "name"> }) {
	const { players } = useStats();
	const [open, setOpen] = useState(false);

	return (
		<FormField
			name="name"
			control={form.control}
			render={({ field }) => (
				<Fragment>
					<div className="col-span-2">
						<Avatar className="size-20">
							<AvatarImage
								src={`https://lhoxbzrtfoofydgvvfuu.supabase.co/storage/v1/object/public/avatars/${field.value}.png`}
							/>
							<AvatarFallback />
						</Avatar>
					</div>
					<FormItem>
						<FormLabel>Player</FormLabel>
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<FormControl className="justify-start capitalize">
									<Button variant="outline" className={cn(!field.value && "text-muted-foreground border-input")}>
										{field.value ? players.find((name) => name === field.value) : "Select player"}
									</Button>
								</FormControl>
							</PopoverTrigger>
							<PopoverContent className="p-0">
								<Command>
									<CommandInput placeholder="Search players..." className="h-9" />
									<CommandList>
										<CommandEmpty>No player found</CommandEmpty>
										<CommandGroup className="overflow-y-auto">
											{players.map((name) => (
												<CommandItem
													key={name}
													value={name}
													onSelect={() => {
														form.setValue("name", name);
														setOpen(false);
													}}
												>
													<span className="capitalize">{name}</span>
													<Check className={cn("ml-auto", name === field.value ? "opacity-100" : "opacity-0")} />
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
						<FormMessage />
					</FormItem>
				</Fragment>
			)}
		/>
	);
}
