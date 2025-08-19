"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { wicketSchema } from "@/lib/validation";
import { useStats } from "@/context/stats-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlayerField } from "@/components/player-field";

import { addWicketAction } from "./action";

export default function AddWicketPage() {
	const { dates, players } = useStats();
	const [isPending, startTransition] = useTransition();

	const defaultValues = {
		batsman: "",
		bowler: "",
		date: dates[0].date
	};

	const form = useForm<z.infer<typeof wicketSchema>>({
		defaultValues,
		mode: "onChange",
		resolver: zodResolver(wicketSchema)
	});

	function onSubmit(values: z.infer<typeof wicketSchema>) {
		startTransition(async () => {
			const { error } = await addWicketAction(values);
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			error ? toast.error(error) : form.reset(defaultValues);
		});
	}

	return (
		<div className="mx-auto w-full max-w-3xl">
			<h1 className="mb-10 text-center text-2xl/9 font-bold capitalize md:text-left">Add Wicket</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-5">
					<FormField
						name="date"
						control={form.control}
						render={({ field }) => (
							<FormItem className="col-span-2 mb-8 flex flex-col">
								<FormLabel>Date</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select date" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{dates.map(({ date, title }) => (
											<SelectItem key={date} value={date}>
												<span className="font-medium">{title}</span>
												<span className="text-muted-foreground">({format(date, "PP")})</span>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="batsman"
						control={form.control}
						render={({ field }) => (
							<FormItem className="place-items-center">
								<FormLabel>Batsman</FormLabel>
								<PlayerField players={players} value={field.value} onSelect={(value) => form.setValue(field.name, value)}>
									<FormControl>
										<Avatar className="size-30">
											<AvatarImage src={`/players/${field.value}.png`} />
											<AvatarFallback />
										</Avatar>
									</FormControl>
								</PlayerField>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="bowler"
						control={form.control}
						render={({ field }) => (
							<FormItem className="place-items-center">
								<FormLabel>Bowler</FormLabel>
								<PlayerField players={players} value={field.value} onSelect={(value) => form.setValue(field.name, value)}>
									<FormControl>
										<Avatar className="size-30">
											<AvatarImage src={`/players/${field.value}.png`} />
											<AvatarFallback />
										</Avatar>
									</FormControl>
								</PlayerField>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="col-span-2 mt-10 flex items-center justify-center">
						<Button type="submit" className="col-span-2 w-fit" disabled={isPending}>
							{isPending ? "Submitting...." : "Submit"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
