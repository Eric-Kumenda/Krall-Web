import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import QRCode from "qrcode";
import { Resend } from "resend";
import { getTicketEmailTemplate } from "@/utils/email-template";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const {
			Body: { stkCallback },
		} = body;

		if (!stkCallback) {
			return NextResponse.json(
				{ error: "Invalid callback data" },
				{ status: 400 }
			);
		}

		const checkoutRequestId = stkCallback.CheckoutRequestID;
		const resultCode = stkCallback.ResultCode;

		const supabase = await createClient();

		// Find registration
		const { data: registration, error: regError } = await supabase
			.from("registrations")
			.select("*, events(title, date)")
			.eq("mpesa_checkout_request_id", checkoutRequestId)
			.single();

		if (regError || !registration) {
			console.error(
				"Registration not found for callback:",
				checkoutRequestId
			);
			return NextResponse.json(
				{ error: "Registration not found" },
				{ status: 404 }
			);
		}

		if (resultCode === 0) {
			// Payment Successful
			await supabase
				.from("registrations")
				.update({ status: "paid" })
				.eq("id", registration.id);

			// Process Attendees
			const attendeeList = registration.attendee_details || [];
			const ticketsForEmail = [];

			for (const att of attendeeList) {
				// Generate Unique Ticket Code
				const ticketSuffix = Math.random()
					.toString(36)
					.substring(2, 8)
					.toUpperCase();
				const ticketCode = `TKT-${ticketSuffix}`;

				// Create Attendee Record
				const { data: newAttendee, error: attError } = await supabase
					.from("attendees")
					.insert({
						registration_id: registration.id,
						name: att.name,
						ticket_code: ticketCode,
						checked_in: false,
						// Assuming ticket_type_id logic is handled or nullable for now.
						// If passed from frontend, use it. `att.ticketTypeId`?
					})
					.select()
					.single();

				if (attError) {
					console.error("Failed to create attendee:", attError);
					continue; // Skip or handle error
				}

				// Generate QR Code
				const qrUrl = await QRCode.toDataURL(ticketCode);

				ticketsForEmail.push({
					name: att.name,
					code: ticketCode,
					qrUrl: qrUrl,
				});
			}

			// Send Email
			if (process.env.RESEND_API_KEY && ticketsForEmail.length > 0) {
				const resend = new Resend(process.env.RESEND_API_KEY);
				const eventTitle =
					registration.events?.title || "Unknown Event";

				await resend.emails.send({
					from: "Krall Events <noreply@krall.co.ke>", // Adjust sender domain
					to: registration.user_email,
					subject: `Your Tickets for ${eventTitle}`,
					html: getTicketEmailTemplate(eventTitle, ticketsForEmail),
				});

				console.log(`Tickets sent to ${registration.user_email}`);
			} else {
				console.warn(
					"RESEND_API_KEY missing or no tickets generated. Email not sent."
				);
			}
		} else {
			// Payment Failed
			await supabase
				.from("registrations")
				.update({ status: "failed" })
				.eq("id", registration.id);
		}

		return NextResponse.json({ message: "Callback processed" });
	} catch (error) {
		console.error("Error in mpesa callback:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
