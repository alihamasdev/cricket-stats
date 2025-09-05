import { z } from "zod";

import { players } from "@/data/data.json";

export const statsSchema = z.object({
	name: z.enum(players, "Enter valid player name"),
	date: z.string().min(1, "Field is required").trim(),
	matches: z.string().min(1, "Field is required").trim(),
	batting: z.object({
		innings: z.string().min(1, "Field is required").trim(),
		runs: z.string().min(1, "Field is required").trim(),
		balls: z.string().min(1, "Field is required").trim(),
		fours: z.string().min(1, "Field is required").trim(),
		sixes: z.string().min(1, "Field is required").trim(),
		ducks: z.string().min(1, "Field is required").trim(),
		not_outs: z.string().min(1, "Field is required").trim()
	}),
	bowling: z.object({
		innings: z.string().min(1, "Field is required").trim(),
		overs: z.string().min(1, "Field is required").trim(),
		wickets: z.string().min(1, "Field is required").trim(),
		runs: z.string().min(1, "Field is required").trim(),
		dots: z.string().min(1, "Field is required").trim(),
		wides: z.string().min(1, "Field is required").trim(),
		no_balls: z.string().min(1, "Field is required").trim().optional()
	}),
	fielding: z.object({
		catches: z.string().min(1, "Field is required").trim().optional(),
		run_outs: z.string().min(1, "Field is required").trim().optional(),
		stumpings: z.string().min(1, "Field is required").trim().optional()
	})
});

export const ballSchema = z.object({
	batter: z.enum(players),
	bowler: z.enum(players),
	score: z.string().min(1, "Field is required").trim(),
	wicket: z.boolean().optional(),
	date: z.string().min(1, "Field is required").trim()
});
