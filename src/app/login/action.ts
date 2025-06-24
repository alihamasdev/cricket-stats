"use server";

import { redirect } from "next/navigation";
import { type SignInWithPasswordCredentials } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";

export async function loginAction(credentials: SignInWithPasswordCredentials) {
	const { auth } = await createClient();
	const { error } = await auth.signInWithPassword(credentials);

	if (error) {
		return { error: error.message };
	}

	redirect("/");
}
