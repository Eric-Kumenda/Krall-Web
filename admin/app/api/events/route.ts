import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const published = searchParams.get("published");

	const supabase = await createClient();
	let query = supabase
		.from("events")
		.select("*")
		.order("date", { ascending: true });

	if (published === "true") {
		query = query.eq("is_published", true);
	}

	const { data, error } = await query;

	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json(data);
}

export async function POST(request: Request) {
	try {
		const supabase = await createClient();
		const formData = await request.formData();

		const image = formData.get("image") as File | null;
		let image_url = (formData.get("image_url") as string) || "";

		// Upload image if present
		if (image) {
			const fileExt = image.name.split(".").pop();
			const fileName = `event-${Date.now()}.${fileExt}`;
			const { error: uploadError } = await supabase.storage
				.from("event-images")
				.upload(fileName, image);

			if (uploadError) throw uploadError;

			const {
				data: { publicUrl },
			} = supabase.storage.from("event-images").getPublicUrl(fileName);

			image_url = publicUrl;
		}

		// Construct event data
		const eventData = {
			title: formData.get("title"),
			description: formData.get("description"),
			date: formData.get("date"),
			location: formData.get("location"),
			price: Number(formData.get("price")),
			tickets_available: Number(formData.get("tickets_available")),
			is_published: formData.get("is_published") === "true",
			created_by: formData.get("created_by"),
			image_url,
		};

		const { data, error } = await supabase
			.from("events")
			.insert(eventData)
			.select()
			.single();

		if (error)
			return NextResponse.json({ error: error.message }, { status: 500 });
		return NextResponse.json(data);
	} catch (error: any) {
		console.error("Error creating event:", error);
		return NextResponse.json(
			{ error: error.message || "Internal Server Error" },
			{ status: 500 }
		);
	}
}
