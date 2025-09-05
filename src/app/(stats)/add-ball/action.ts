"use server";

import { readFile, writeFile } from "fs/promises";
import path from "path";
import { z } from "zod";

import { ballSchema } from "@/lib/validation";

const filePath = path.join(process.cwd(), "src", "data", "balls.json");

type BallData = z.infer<typeof ballSchema>;

export async function addBall({ batter, bowler, score, wicket, date }: BallData) {
	try {
		const fileContent = await readFile(filePath, "utf-8");
		const prevData = JSON.parse(fileContent);

		const newData = { batter, bowler, score: Number(score), wicket, date };

		await writeFile(filePath, JSON.stringify([...prevData, newData], null, 0));

		return { error: null };
	} catch (error) {
		console.error(error);
		return { error: "Error" };
	}
}
