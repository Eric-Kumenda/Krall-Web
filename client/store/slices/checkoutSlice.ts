import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Attendee {
	ticketType: string;
	name: string;
}

interface CheckoutState {
	step: "email" | "details" | "payment" | "success";
	email: string;
	isVerified: boolean;
	verificationCode: string;
	attendees: Attendee[];
	paymentStatus: "idle" | "loading" | "success" | "failed";
	paymentError: string | null;
	checkoutRequestId: string | null;
	registrationId: string | null;
}

const initialState: CheckoutState = {
	step: "email",
	email: "",
	isVerified: false,
	verificationCode: "",
	attendees: [],
	paymentStatus: "idle",
	paymentError: null,
	checkoutRequestId: null,
	registrationId: null,
};

// Helper to get API URL
const getApiUrl = (path: string) => {
	// Use local proxy
	const baseUrl = "/api/admin";
	// Strip leading /api if present to avoid duplicating it with backend path if backend expects /api or if proxy adds it
	// But wait, the proxy is: source: "/api/admin/:path*", destination: "BACKEND/api/:path*"
	// So if we request /api/admin/auth/send-code, it goes to BACKEND/api/auth/send-code.
	// The path argument here is likely passed as "/api/auth/send-code".
	// If we assume path starts with /api, we should be careful.

	// Actually, let's look at how eventsSlice does it.
	// eventsSlice uses API_URL = "/api/admin". Then fetches `${API_URL}/events`.
	// So it fetches `/api/admin/events`.
	// And the proxy maps `/api/admin/events` -> `BACKEND/api/events`.

	// So here, if we pass `/api/auth/send-code`, we want `/api/admin/auth/send-code`.
	// Wait, if path is `/api/auth/send-code`, and we just append to `/api/admin`, we get `/api/admin/api/auth/send-code`.
	// That would map to `BACKEND/api/api/auth/send-code`. This is wrong.

	// We need to strip the leading `/api` from the path if we use `/api/admin` as base, OR we shouldn't pass `/api` in the path argument.
	// But the thunks enable us to pass full paths.

	// Let's modify the calls to not include /api, OR handle it here.
	// Safest is to clean the path here.
	const cleanPath = path.startsWith("/api") ? path.substring(4) : path;
	return `${baseUrl}${cleanPath}`;
};

// Async Thunks
export const sendVerificationCode = createAsyncThunk(
	"checkout/sendCode",
	async (email: string) => {
		const response = await fetch(getApiUrl("/api/auth/send-code"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email }),
		});
		if (!response.ok) throw new Error("Failed to send code");
		return email;
	}
);

export const verifyCode = createAsyncThunk(
	"checkout/verifyCode",
	async ({ email, code }: { email: string; code: string }) => {
		const response = await fetch(getApiUrl("/api/auth/verify-code"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, code }),
		});
		if (!response.ok) throw new Error("Invalid code");
		return true;
	}
);

export const initiatePayment = createAsyncThunk(
	"checkout/initiatePayment",
	async (data: {
		phoneNumber: string;
		amount: number;
		eventId: string | number;
		email: string;
		attendees: Attendee[];
	}) => {
		const response = await fetch(getApiUrl("/api/payment/mpesa"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		const result = await response.json();
		if (!response.ok)
			throw new Error(result.error || "Payment initiation failed");
		return result;
	}
);

export const checkoutSlice = createSlice({
	name: "checkout",
	initialState,
	reducers: {
		setStep: (state, action: PayloadAction<CheckoutState["step"]>) => {
			state.step = action.payload;
		},
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setVerificationCode: (state, action: PayloadAction<string>) => {
			state.verificationCode = action.payload;
		},
		setAttendees: (state, action: PayloadAction<Attendee[]>) => {
			state.attendees = action.payload;
		},
		updateAttendeeName: (
			state,
			action: PayloadAction<{ index: number; name: string }>
		) => {
			state.attendees[action.payload.index].name = action.payload.name;
		},
		resetCheckout: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(verifyCode.fulfilled, (state) => {
				state.isVerified = true;
				state.step = "details";
			})
			.addCase(initiatePayment.pending, (state) => {
				state.paymentStatus = "loading";
				state.paymentError = null;
			})
			.addCase(initiatePayment.fulfilled, (state, action) => {
				state.paymentStatus = "success";
				state.checkoutRequestId = action.payload.checkoutRequestId;
				state.registrationId = action.payload.registrationId;
				state.step = "success"; // Ideally wait for callback, but for MVP/Mock we can move to success or a polling state
			})
			.addCase(initiatePayment.rejected, (state, action) => {
				state.paymentStatus = "failed";
				state.paymentError = action.error.message || "Payment failed";
			});
	},
});

export const {
	setStep,
	setEmail,
	setVerificationCode,
	setAttendees,
	updateAttendeeName,
	resetCheckout,
} = checkoutSlice.actions;

export const selectCheckout = (state: RootState) => state.checkout;

export default checkoutSlice.reducer;
