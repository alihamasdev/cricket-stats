"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { loginAction } from "./action";

const loginSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(8, "Password must be atleast 8 characters long")
});

export default function LoginPage() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" }
	});

	function onSubmit(values: z.infer<typeof loginSchema>) {
		startTransition(async () => {
			const { error } = await loginAction(values);
			if (error) {
				toast.error(error);
			}
		});
	}

	return (
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
											<Input {...field} />
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
							<Button type="submit" className="w-full" disabled={isPending}>
								Login
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
