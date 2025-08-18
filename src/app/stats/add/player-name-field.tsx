"use client";

import { Fragment, useState } from "react";
import { Check } from "lucide-react";
import { type UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";
import { StatsSchema } from "@/lib/validation";
import { useStats } from "@/context/stats-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function PlayerNameField({ form }: { form: UseFormReturn<StatsSchema, "name"> }) {
	const { players } = useStats();
	const [open, setOpen] = useState(false);

	return (
		<FormField
			name="name"
			control={form.control}
			render={({ field: { value } }) => (
				<Fragment>
					<FormItem className="col-span-2">
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<FormControl>
									<Avatar className="size-30">
										<AvatarImage
											src={`https://lhoxbzrtfoofydgvvfuu.supabase.co/storage/v1/object/public/avatars/${value}.png`}
										/>
										<AvatarFallback />
									</Avatar>
								</FormControl>
							</PopoverTrigger>
							<PopoverContent className="p-0" align="end">
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
													<Check className={cn("ml-auto", name === value ? "opacity-100" : "opacity-0")} />
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
