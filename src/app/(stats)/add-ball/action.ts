"use server";

import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { ballSchema } from "@/lib/validation";

export async function addWicketAction(data: z.infer<typeof ballSchema>) {
	const supabase = await createClient();
	const { success } = ballSchema.safeParse(data);
	if (!success) return { error: "Please provide valid data" };

	const { batsman, bowler, score, wicket } = data;

	const { error } = await supabase.from("stats").insert({ batsman, bowler, score: Number(score), wicket });

	return { error: error ? error.message : null };
}
