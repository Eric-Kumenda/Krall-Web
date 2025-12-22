import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ ticketId: string }> }
) {
	const { ticketId } = await params;
	const supabase = await createClient();

	const { error } = await supabase
		.from("event_tickets")
		.delete()
		.eq("id", ticketId);

	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json({ success: true });
}
