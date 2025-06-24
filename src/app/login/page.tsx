"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { loginAction } from "./action";

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be atleast 8 characters long")
});

export default function LoginPage() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	function onSubmit(values: z.infer<typeof loginSchema>) {
		startTransition(async () => {
			const { error } = await loginAction(values);
			toast.error(error);
		});
	}

	return (
		<div className="flex h-[calc(100dvh-68px)] items-center justify-center">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Login to your account</CardTitle>
						<CardDescription className="">Enter your email below to login to your account</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input placeholder="m@example.com" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input type="password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full" disabled={!form.formState.isValid || isPending}>
									{!isPending ? <BeatLoader style={{ color: "--color-primary-foreground" }} size={8} /> : "Login"}
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
