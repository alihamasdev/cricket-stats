"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ballSchema } from "@/lib/validation";
import { useStats } from "@/context/stats-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PlayerField } from "@/components/player-field";

import { addWicketAction } from "./action";

export default function AddWicketPage() {
	const { players, dates } = useStats();
	const [isPending, startTransition] = useTransition();

	const defaultValues = {
		batsman: "",
		bowler: "",
		score: "0",
		wicket: false,
		dates: dates[0].date
	};

	const form = useForm<z.infer<typeof ballSchema>>({
		defaultValues,
		mode: "onChange",
		resolver: zodResolver(ballSchema)
	});

	function onSubmit(values: z.infer<typeof ballSchema>) {
		startTransition(async () => {
			const { error } = await addWicketAction(values);
			if (error) {
				toast.error(error);
			} else {
				form.setValue("wicket", false);
				form.setValue("score", "0");
				toast.success("Ball added successfully");
			}
		});
	}

	return (
		<div className="mx-auto w-full max-w-3xl">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-5">
					<FormField
						name="batter"
						control={form.control}
						render={({ field }) => (
							<FormItem>
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
							<FormItem>
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
										className="flex items-center gap-x-3"
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
						name="wicket"
						control={form.control}
						render={({ field: { value, onChange } }) => (
							<FormItem>
								<FormLabel>Wicket</FormLabel>
								<FormControl>
									<Switch checked={value} onCheckedChange={onChange} />
								</FormControl>
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
