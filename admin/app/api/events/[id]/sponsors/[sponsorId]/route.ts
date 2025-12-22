import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ sponsorId: string }> }
) {
	const { sponsorId } = await params;
	const supabase = await createClient();

	const { error } = await supabase
		.from("event_sponsors")
		.delete()
		.eq("id", sponsorId);

	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json({ success: true });
}
