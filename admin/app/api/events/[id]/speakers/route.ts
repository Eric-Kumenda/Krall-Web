import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("event_speakers")
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
	const formData = await request.formData();

	const name = formData.get("name") as string;
	const role = formData.get("role") as string;
	const socials = formData.get("socials") as string; // JSON string
	const avatarFile = formData.get("avatar") as File;

	let avatarUrl = "";

	if (avatarFile) {
		const fileExt = avatarFile.name.split(".").pop();
		const fileName = `${id}-${Date.now()}.${fileExt}`;
		const { error: uploadError } = await supabase.storage
			.from("event-images")
			.upload(`speakers/${fileName}`, avatarFile);

		if (uploadError) {
			return NextResponse.json(
				{ error: uploadError.message },
				{ status: 500 }
			);
		}

		const {
			data: { publicUrl },
		} = supabase.storage
			.from("event-images")
			.getPublicUrl(`speakers/${fileName}`);

		avatarUrl = publicUrl;
	}

	const { data, error } = await supabase
		.from("event_speakers")
		.insert({
			event_id: id,
			name,
			role,
			socials: socials ? JSON.parse(socials) : {},
			avatar_url: avatarUrl,
		})
		.select()
		.single();

	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json(data);
}
