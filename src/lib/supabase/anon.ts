import { createClient as createAnonClient } from "@supabase/supabase-js";

import { type Database } from "@/lib/supabase/database";

export function createClient() {
	return createAnonClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!, {
		global: {
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!}`
			}
		},

		auth: {
			autoRefreshToken: false,
			persistSession: false,
			detectSessionInUrl: false
		}
	});
}
