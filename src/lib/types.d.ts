import { type Tables } from "@/lib/supabase/database";

export type BattingStats = Tables<"batting">;
export type BowlingStats = Tables<"bowling">;
export type FieldingStats = Tables<"fielding">;
