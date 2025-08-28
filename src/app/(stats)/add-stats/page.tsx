"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { statsSchema } from "@/lib/validation";
import { dates, players } from "@/data/data.json";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerField } from "@/components/player-field";

import { addStatsAction } from "./action";

export default function AddStatsPage() {
	const [isPending, startTransition] = useTransition();

	const defaultValues = {
		name: "",
		matches: "",
		date: dates[0].date,
		batting: { innings: "", runs: "", balls: "", fours: "", sixes: "", ducks: "", not_outs: "" },
		bowling: { innings: "", runs: "", dots: "", no_balls: "0", overs: "", wickets: "", wides: "" },
		fielding: { catches: "0", run_outs: "0", stumpings: "0" }
	};

	const form = useForm<z.infer<typeof statsSchema>>({
		defaultValues,
		mode: "onChange",
		resolver: zodResolver(statsSchema)
	});

	function onSubmit(values: z.infer<typeof statsSchema>) {
		startTransition(async () => {
			const { error } = await addStatsAction(values);
			if (error) {
				toast.error(error);
			} else {
				toast.success("Stats added successfuly");
				form.reset(defaultValues);
			}
		});
	}

	return (
		<div className="mx-auto mb-auto w-full max-w-4xl">
			<h1 className="mb-5 text-center text-2xl/9 font-bold capitalize md:text-left">Add Stats</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-5">
					<FormField
						name="name"
						control={form.control}
						render={({ field }) => (
							<FormItem className="col-span-2">
								<PlayerField players={players} value={field.value} onSelect={(value) => form.setValue("name", value)}>
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
						name="matches"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Matches</FormLabel>
								<FormControl>
									<Input type="number" disabled={isPending} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="date"
						control={form.control}
						render={({ field }) => (
							<FormItem className="flex flex-col justify-end">
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

					<Tabs defaultValue="fielding" className="col-span-2 gap-5">
						<TabsList className="flex h-10 w-full justify-center p-1">
							<TabsTrigger value="batting" className={cn(form.formState.errors.batting && "!text-destructive")}>
								Batting
							</TabsTrigger>
							<TabsTrigger value="bowling" className={cn(form.formState.errors.bowling && "!text-destructive")}>
								Bowling
							</TabsTrigger>
							<TabsTrigger value="fielding" className={cn(form.formState.errors.fielding && "!text-destructive")}>
								Fielding
							</TabsTrigger>
						</TabsList>

						{/* Batting */}
						<TabsContent value="batting" className="grid grid-cols-2 gap-5">
							<FormField
								name="batting.innings"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Innings</FormLabel>
										<FormControl>
											<Input type="number" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="batting.runs"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Runs</FormLabel>
										<FormControl>
											<Input type="number" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="batting.balls"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Balls</FormLabel>
										<FormControl>
											<Input type="number" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="batting.not_outs"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Not Outs</FormLabel>
										<FormControl>
											<Input type="number" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="batting.fours"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Fours</FormLabel>
										<FormControl>
											<Input type="number" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="batting.sixes"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Sixes</FormLabel>
										<FormControl>
											<Input type="number" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="batting.ducks"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Ducks</FormLabel>
										<FormControl>
											<Input type="number" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</TabsContent>

						{/* Bowling  */}
						<TabsContent value="bowling" className="grid grid-cols-2 gap-5">
							<FormField
								name="bowling.innings"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Innings</FormLabel>
										<FormControl>
											<Input type="number" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="bowling.overs"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Overs</FormLabel>
										<FormControl>
											<Input type="number" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="bowling.wickets"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Wickets</FormLabel>
										<FormControl>
											<Input type="number" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="bowling.runs"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Runs</FormLabel>
										<FormControl>
											<Input type="number" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="bowling.dots"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Dots Balls</FormLabel>
										<FormControl>
											<Input type="number" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="bowling.wides"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Wide Balls</FormLabel>
										<FormControl>
											<Input type="number" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="bowling.no_balls"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>No Balls</FormLabel>
										<FormControl>
											<Input type="number" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</TabsContent>

						{/* Fielding */}
						<TabsContent value="fielding" className="grid grid-cols-2 gap-5">
							<FormField
								name="fielding.catches"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Catches</FormLabel>
										<FormControl>
											<Input type="number" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="fielding.run_outs"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Run Outs</FormLabel>
										<FormControl>
											<Input type="number" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="fielding.stumpings"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Stumpings</FormLabel>
										<FormControl>
											<Input type="number" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</TabsContent>
					</Tabs>

					<Button type="submit" className="col-span-2 w-fit" disabled={isPending}>
						{isPending ? "Submitting...." : "Submit"}
					</Button>
				</form>
			</Form>
		</div>
	);
}
