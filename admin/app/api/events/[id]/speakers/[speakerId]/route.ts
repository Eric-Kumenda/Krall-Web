import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ speakerId: string }> }
) {
	const { speakerId } = await params;
	const supabase = await createClient();

	// Optional: Delete avatar from storage if needed (omitted for simplicity, but good practice)

	const { error } = await supabase
		.from("event_speakers")
		.delete()
		.eq("id", speakerId);

	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json({ success: true });
}
