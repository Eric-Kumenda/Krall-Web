import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("event_sponsors")
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
	const website_url = formData.get("website_url") as string;
	const logoFile = formData.get("logo") as File;

	let logoUrl = "";

	if (logoFile) {
		const fileExt = logoFile.name.split(".").pop();
		const fileName = `${id}-${Date.now()}.${fileExt}`;
		const { error: uploadError } = await supabase.storage
			.from("event-images")
			.upload(`sponsors/${fileName}`, logoFile);

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
			.getPublicUrl(`sponsors/${fileName}`);

		logoUrl = publicUrl;
	}

	const { data, error } = await supabase
		.from("event_sponsors")
		.insert({
			event_id: id,
			name,
			website_url,
			logo_url: logoUrl,
		})
		.select()
		.single();

	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json(data);
}
