import { z } from "zod";

const field = z
	.string()
	.trim()
	.refine((val) => Boolean(val.length), { message: "Field is required" });

export const statsSchema = z.object({
	name: field,
	date: field,
	matches: field,
	batting: z.object({
		innings: field,
		runs: field,
		balls: field,
		fours: field,
		sixes: field,
		ducks: field,
		not_outs: field
	}),
	bowling: z.object({
		innings: field,
		overs: field,
		wickets: field,
		runs: field,
		dots: field,
		wides: field,
		no_balls: field.optional()
	}),
	fielding: z.object({
		catches: field.optional(),
		run_outs: field.optional(),
		stumpings: field.optional()
	})
});
