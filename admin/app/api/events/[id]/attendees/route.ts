import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
	request: Request,
	props: { params: Promise<{ id: string }> }
) {
	const params = await props.params;
	try {
		const eventId = params.id;
		const supabase = await createClient();

		const { data: attendees, error } = await supabase
			.from("attendees")
			.select(
				`
        *,
        registrations (
          user_email,
          status,
          total_amount
        ),
        ticket_types (
          name,
          price
        )
      `
			)
			.eq("registrations.event_id", eventId);

		if (error) {
			console.error("Error fetching attendees:", error);
			return NextResponse.json(
				{ error: "Failed to fetch attendees" },
				{ status: 500 }
			);
		}

		// Filter out attendees where registration might be null (if inner join logic needed, but Supabase returns null for left join if not found)
		// Also need to filter by event_id on the registration level if not done in query.
		// The query above joins registrations. We need to ensure we only get attendees for this event.
		// Supabase filtering on joined tables: !inner to force join

		const { data: filteredAttendees, error: filterError } = await supabase
			.from("attendees")
			.select(
				`
        *,
        registrations!inner (
          event_id,
          user_email,
          status,
          total_amount
        ),
        ticket_types (
          name,
          price
        )
      `
			)
			.eq("registrations.event_id", eventId);

		if (filterError) {
			console.error("Error fetching filtered attendees:", filterError);
			return NextResponse.json(
				{ error: "Failed to fetch attendees" },
				{ status: 500 }
			);
		}

		return NextResponse.json(filteredAttendees);
	} catch (error) {
		console.error("Error in get attendees:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
