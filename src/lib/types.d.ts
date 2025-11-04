import type { Tables } from "@/lib/supabase/database";

export interface BattingStats extends Omit<Tables<"batting">, "id" | "date"> {
	strike_rate: number;
	average: number;
}

export interface BowlingStats extends Omit<Tables<"bowling">, "id" | "date"> {
	strike_rate: number;
	average: number;
}
