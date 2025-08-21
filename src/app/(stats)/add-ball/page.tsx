"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ballSchema } from "@/lib/validation";
import { useStats } from "@/context/stats-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { PlayerField } from "@/components/player-field";

import { addWicketAction } from "./action";

export default function AddWicketPage() {
	const { players } = useStats();
	const [isPending, startTransition] = useTransition();

	const defaultValues = {
		batsman: "",
		bowler: "",
		score: "0",
		wicket: false
	};

	const form = useForm<z.infer<typeof ballSchema>>({
		defaultValues,
		mode: "onChange",
		resolver: zodResolver(ballSchema)
	});

	function onSubmit(values: z.infer<typeof ballSchema>) {
		startTransition(async () => {
			const { error } = await addWicketAction(values);
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			error ? toast.error(error) : form.reset(defaultValues);
		});
	}

	return (
		<div className="mx-auto w-full max-w-3xl">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-5">
					<FormField
						name="batsman"
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
									<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center gap-x-3">
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
						name="wicket"
						control={form.control}
						render={({ field: { value, onChange } }) => (
							<FormItem>
								<FormLabel>Wicket</FormLabel>
								<div className="flex h-9 items-center">
									<FormControl>
										<Switch checked={value} onCheckedChange={onChange} />
									</FormControl>
								</div>
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
