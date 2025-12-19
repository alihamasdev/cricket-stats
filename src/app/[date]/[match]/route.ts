import { NextResponse, type NextRequest } from "next/server";

export async function GET(_request: NextRequest, { params }: RouteContext<"/[date]/[match]">) {
	const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
	const { date, match } = await params;
	return NextResponse.rewrite(new URL(`/storage/v1/object/public/scorecards/${date}/${match}`, baseURL));
}
