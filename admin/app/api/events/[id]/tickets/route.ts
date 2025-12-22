import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("event_tickets")
		.select("*")
		.eq("event_id", id)
		.order("created_at", { ascending: true });

	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json(data);
}

export async function POST(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const supabase = await createClient();
	const json = await request.json();

	const { type, price, quantity_available } = json;

	const { data, error } = await supabase
		.from("event_tickets")
		.insert({
			event_id: id,
			type,
			price,
			quantity_available,
		})
		.select()
		.single();

	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json(data);
}
