"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { ballSchema } from "@/lib/validation";
import { dates, players } from "@/data/data.json";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlayerField } from "@/components/player-field";

import { addBall } from "./action";

export default function AddWicketPage() {
	const [isPending, startTransition] = useTransition();

	const defaultValues = {
		batter: "",
		bowler: "",
		score: "0",
		wicket: false,
		date: dates[0].date
	} satisfies z.infer<typeof ballSchema>;

	const form = useForm<z.infer<typeof ballSchema>>({
		defaultValues,
		mode: "onChange",
		resolver: zodResolver(ballSchema)
	});

	function onSubmit(values: z.infer<typeof ballSchema>) {
		startTransition(async () => {
			const { error } = await addBall(values);
			if (error) {
				toast.error("Something went wrong while adding ball");
			} else {
				form.setValue("score", "0");
				form.setValue("wicket", false);
				toast.success("Ball added");
			}
		});
	}

	return (
		<div className="mx-auto w-full max-w-3xl px-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 md:grid-cols-2">
					<div className="grid grid-cols-2 gap-5 md:col-span-2">
						<FormField
							name="batter"
							control={form.control}
							render={({ field: { name, value } }) => (
								<FormItem className="place-items-center md:place-items-start">
									<FormLabel>Batsman</FormLabel>
									<PlayerField players={players} value={value} onSelect={(value) => form.setValue(name, value)}>
										<FormControl>
											<Avatar className="size-25 rounded-lg">
												<AvatarImage src={`/players/${value}.png`} />
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
							render={({ field: { name, value } }) => (
								<FormItem className="place-items-center md:place-items-start">
									<FormLabel>Bowler</FormLabel>
									<PlayerField players={players} value={value} onSelect={(value) => form.setValue(name, value)}>
										<FormControl>
											<Avatar className="size-25 rounded-lg">
												<AvatarImage src={`/players/${value}.png`} />
												<AvatarFallback />
											</Avatar>
										</FormControl>
									</PlayerField>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						name="score"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Score</FormLabel>
								<FormControl>
									<RadioGroup
										value={field.value}
										defaultValue={field.value}
										onValueChange={field.onChange}
										className="flex items-center justify-evenly"
									>
										<RadioGroupItem value="0" />
										<RadioGroupItem value="1" />
										<RadioGroupItem value="2" />
										<RadioGroupItem value="3" />
										<RadioGroupItem value="4" />
										<RadioGroupItem value="5" />
										<RadioGroupItem value="6" />
									</RadioGroup>
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
								<Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
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
						name="wicket"
						control={form.control}
						render={({ field: { value, onChange } }) => (
							<FormItem className="flex flex-row-reverse justify-end">
								<FormLabel className={cn(value && "text-destructive")}>Wicket</FormLabel>
								<FormControl>
									<Checkbox
										checked={value}
										onCheckedChange={onChange}
										className="data-[state=checked]:bg-destructive data-[state=checked]:border-destructive data-[state=checked]:text-destructive"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="mt-2 flex items-center md:col-span-2">
						<Button type="submit" disabled={isPending}>
							{isPending ? "Submitting...." : "Submit"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
