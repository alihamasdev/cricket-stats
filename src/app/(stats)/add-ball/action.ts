"use server";

import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { ballSchema } from "@/lib/validation";

export async function addWicketAction(data: z.infer<typeof ballSchema>) {
	const supabase = await createClient();
	const { success } = ballSchema.safeParse(data);
	if (!success) return { error: "Please provide valid data" };

	const { batter, bowler, score, wicket, date } = data;

	const { error } = await supabase.from("stats").insert({ batter, bowler, wicket, date, score: Number(score) });

	return { error: error ? error.message : null };
}
