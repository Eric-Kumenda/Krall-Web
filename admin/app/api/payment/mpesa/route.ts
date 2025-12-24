import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

// Helper to get timestamp
const getTimestamp = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = ("0" + (date.getMonth() + 1)).slice(-2);
	const day = ("0" + date.getDate()).slice(-2);
	const hour = ("0" + date.getHours()).slice(-2);
	const minute = ("0" + date.getMinutes()).slice(-2);
	const second = ("0" + date.getSeconds()).slice(-2);
	return `${year}${month}${day}${hour}${minute}${second}`;
};

export async function POST(request: Request) {
	try {
		const { phoneNumber, amount, eventId, email, attendees } =
			await request.json();

		if (!phoneNumber || !amount || !eventId || !email || !attendees) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		const supabase = await createClient();

		// Create pending registration
		const { data: registration, error: regError } = await supabase
			.from("registrations")
			.insert({
				event_id: eventId,
				user_email: email,
				total_amount: amount,
				status: "pending",
				attendee_details: attendees,
			})
			.select()
			.single();

		if (regError) {
			console.error("Registration error:", regError);
			return NextResponse.json(
				{ error: "Failed to create registration" },
				{ status: 500 }
			);
		}

		// MPesa Credentials
		const consumerKey = process.env.MPESA_CONSUMER_KEY;
		const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
		const passkey = process.env.MPESA_PASSKEY;
		const shortcode = process.env.MPESA_SHORTCODE;
		const callbackUrl = process.env.MPESA_CALLBACK_URL; // e.g., https://your-domain.com/api/payment/callback

		if (
			!consumerKey ||
			!consumerSecret ||
			!passkey ||
			!shortcode ||
			!callbackUrl
		) {
			// For development without creds, simulate success
			console.log(
				"[MOCK MPESA] Simulating STK Push for:",
				phoneNumber,
				amount
			);

			// Update registration with mock checkout ID
			await supabase
				.from("registrations")
				.update({ mpesa_checkout_request_id: `mock_${Date.now()}` })
				.eq("id", registration.id);

			return NextResponse.json({
				message: "STK Push initiated (MOCK)",
				checkoutRequestId: `mock_${Date.now()}`,
				registrationId: registration.id,
			});
		}

		// Generate Token
		const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
			"base64"
		);
		const tokenRes = await fetch(
			"https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
			{
				headers: { Authorization: `Basic ${auth}` },
			}
		);
		const { access_token } = await tokenRes.json();

		// STK Push
		const timestamp = getTimestamp();
		const password = Buffer.from(
			`${shortcode}${passkey}${timestamp}`
		).toString("base64");

		const stkRes = await fetch(
			"https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					BusinessShortCode: shortcode,
					Password: password,
					Timestamp: timestamp,
					TransactionType: "CustomerPayBillOnline",
					Amount: Math.floor(amount), // Ensure integer
					PartyA: phoneNumber,
					PartyB: shortcode,
					PhoneNumber: phoneNumber,
					CallBackURL: callbackUrl,
					AccountReference: "KrallEvents",
					TransactionDesc: `Payment for Event ${eventId}`,
				}),
			}
		);

		const stkData = await stkRes.json();

		if (stkData.ResponseCode !== "0") {
			return NextResponse.json(
				{ error: "STK Push failed", details: stkData },
				{ status: 400 }
			);
		}

		// Update registration with CheckoutRequestID
		await supabase
			.from("registrations")
			.update({ mpesa_checkout_request_id: stkData.CheckoutRequestID })
			.eq("id", registration.id);

		return NextResponse.json({
			message: "STK Push initiated",
			checkoutRequestId: stkData.CheckoutRequestID,
			registrationId: registration.id,
		});
	} catch (error) {
		console.error("Error in mpesa payment:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
