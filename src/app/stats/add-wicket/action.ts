"use server";

import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { wicketSchema } from "@/lib/validation";

export async function addWicketAction(data: z.infer<typeof wicketSchema>) {
	const supabase = await createClient();
	const { success } = wicketSchema.safeParse(data);
	if (!success) return { error: "Please provide valid data" };

	const { error } = await supabase.from("wickets").insert(data);

	return { error: error ? error.message : null };
}
