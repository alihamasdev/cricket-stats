import { z } from "zod";

const statsFormValue = z
	.string()
	.trim()
	.refine((val) => Boolean(val.length), { message: "Field is required" });

export const statsSchema = z
	.object({
		name: statsFormValue,
		date: statsFormValue,
		matches: statsFormValue,
		batting: z.object({
			innings: statsFormValue,
			runs: statsFormValue,
			balls: statsFormValue,
			fours: statsFormValue,
			sixes: statsFormValue,
			ducks: statsFormValue,
			not_outs: statsFormValue
		}),
		bowling: z.object({
			innings: statsFormValue,
			overs: statsFormValue,
			wickets: statsFormValue,
			runs: statsFormValue,
			dots: statsFormValue,
			wides: statsFormValue,
			no_balls: statsFormValue
		}),
		fielding: z.object({
			catches: statsFormValue,
			run_outs: statsFormValue,
			stumpings: statsFormValue
		})
	})
	.refine(({ matches, batting: { innings } }) => Number(matches) >= Number(innings), {
		message: "Innings can't be greater than matches",
		path: ["battingInnings"]
	})
	.refine(({ matches, bowling: { overs } }) => Number(matches) >= Number(overs), {
		message: "Overs can't be greater than matches",
		path: ["bowlingOvers"]
	});

export const ballSchema = z.object({
	batter: statsFormValue,
	bowler: statsFormValue,
	score: statsFormValue,
	wicket: z.boolean().optional(),
	date: statsFormValue
});
