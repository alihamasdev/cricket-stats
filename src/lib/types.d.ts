import { type Tables } from "@/lib/supabase/database";

export type BattingStats = Tables<"batting">;
export type BowlingStats = Tables<"bowling">;
export type FieldingStats = Tables<"fielding">;
export interface BallStats {
	batter: string;
	bowler: string;
	score: number;
	wicket: boolean;
	date: string;
}

export interface StatsData {
	batting: Record<string, BattingStats[]>;
	bowling: Record<string, BowlingStats[]>;
	fielding: Record<string, FieldingStats[]>;
}

export interface CompareStats {
	name: string;
	runs: number;
	balls: number;
	fours: number;
	sixes: number;
	outs: number;
	strikeRate: number;
}

export interface Team {
	name: string;
	score: string;
	wickets: string;
	overs: string;
	allOut: boolean;
	players: string[];
	batters: BattingPlayer[];
	bowlers: BowlingPlayer[];
}

export interface BattingPlayer {
	name: string;
	runs: string;
	balls: string;
	out: boolean;
}

export interface BowlingPlayer {
	name: string;
	wickets: string;
	runs: string;
	overs: string;
}
