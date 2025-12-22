import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Event {
	id: string;
	title: string;
	description: string;
	date: string;
	location: string;
	image_url: string;
	price: number;
	tickets_available: number;
	tickets_sold: number;
	is_published: boolean;
	created_by: string;
	// Relations
	speakers?: Speaker[];
	sponsors?: Sponsor[];
	tickets?: Ticket[];
	what_to_expect?: string[];
	venue?: string;
	category?: string;
	phone?: string;
	email?: string;
}

interface EventsState {
	items: Event[];
	loading: boolean;
	error: string | null;
}

const initialState: EventsState = {
	items: [],
	loading: false,
	error: null,
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
	const response = await fetch("/api/events");
	if (!response.ok) throw new Error("Failed to fetch events");
	return response.json();
});

export const createEvent = createAsyncThunk(
	"events/createEvent",
	async (eventData: FormData) => {
		const response = await fetch("/api/events", {
			method: "POST",
			body: eventData, // Fetch automatically sets Content-Type for FormData
		});
		if (!response.ok) throw new Error("Failed to create event");
		return response.json();
	}
);

export const fetchEventById = createAsyncThunk(
	"events/fetchEventById",
	async (id: string) => {
		const response = await fetch(`/api/events/${id}`);
		if (!response.ok) throw new Error("Failed to fetch event");
		return response.json();
	}
);

export const updateEvent = createAsyncThunk(
	"events/updateEvent",
	async ({ id, data }: { id: string; data: FormData }) => {
		const response = await fetch(`/api/events/${id}`, {
			method: "PUT",
			body: data,
			credentials: "include",
		});
		if (!response.ok) throw new Error("Failed to update event");
		return response.json();
	}
);

// Types
interface Speaker {
	id: string;
	name: string;
	role: string;
	avatar_url: string;
	socials: any;
}

interface Sponsor {
	id: string;
	name: string;
	logo_url: string;
	website_url: string;
}

interface Ticket {
	id: string;
	type: string;
	price: number;
	quantity_available: number;
}

// Speakers Thunks
export const addEventSpeaker = createAsyncThunk(
	"events/addSpeaker",
	async ({ eventId, data }: { eventId: string; data: FormData }) => {
		const response = await fetch(`/api/events/${eventId}/speakers`, {
			method: "POST",
			body: data,
		});
		if (!response.ok) throw new Error("Failed to add speaker");
		return response.json();
	}
);

export const deleteEventSpeaker = createAsyncThunk(
	"events/deleteSpeaker",
	async ({ eventId, speakerId }: { eventId: string; speakerId: string }) => {
		const response = await fetch(
			`/api/events/${eventId}/speakers/${speakerId}`,
			{
				method: "DELETE",
			}
		);
		if (!response.ok) throw new Error("Failed to delete speaker");
		return speakerId;
	}
);

// Sponsors Thunks
export const addEventSponsor = createAsyncThunk(
	"events/addSponsor",
	async ({ eventId, data }: { eventId: string; data: FormData }) => {
		const response = await fetch(`/api/events/${eventId}/sponsors`, {
			method: "POST",
			body: data,
		});
		if (!response.ok) throw new Error("Failed to add sponsor");
		return response.json();
	}
);

export const deleteEventSponsor = createAsyncThunk(
	"events/deleteSponsor",
	async ({ eventId, sponsorId }: { eventId: string; sponsorId: string }) => {
		const response = await fetch(
			`/api/events/${eventId}/sponsors/${sponsorId}`,
			{
				method: "DELETE",
			}
		);
		if (!response.ok) throw new Error("Failed to delete sponsor");
		return sponsorId;
	}
);

// Tickets Thunks
export const addEventTicket = createAsyncThunk(
	"events/addTicket",
	async ({ eventId, data }: { eventId: string; data: any }) => {
		const response = await fetch(`/api/events/${eventId}/tickets`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error("Failed to add ticket");
		return response.json();
	}
);

export const deleteEventTicket = createAsyncThunk(
	"events/deleteTicket",
	async ({ eventId, ticketId }: { eventId: string; ticketId: string }) => {
		const response = await fetch(
			`/api/events/${eventId}/tickets/${ticketId}`,
			{
				method: "DELETE",
			}
		);
		if (!response.ok) throw new Error("Failed to delete ticket");
		return ticketId;
	}
);

export const deleteEvent = createAsyncThunk(
	"events/deleteEvent",
	async (id: string) => {
		const response = await fetch(`/api/events/${id}`, {
			method: "DELETE",
		});
		if (!response.ok) throw new Error("Failed to delete event");
		return id;
	}
);

const eventsSlice = createSlice({
	name: "events",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Fetch
			.addCase(fetchEvents.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchEvents.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchEvents.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch events";
			})
			// Fetch Single
			.addCase(fetchEventById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchEventById.fulfilled, (state, action) => {
				state.loading = false;
				// Optionally update the item in the list if it exists, or just rely on the component using the returned data
				const index = state.items.findIndex(
					(e) => e.id === action.payload.id
				);
				if (index !== -1) {
					state.items[index] = action.payload;
				} else {
					state.items.push(action.payload);
				}
			})
			.addCase(fetchEventById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch event";
			})
			// Create
			.addCase(createEvent.fulfilled, (state, action) => {
				state.items.push(action.payload);
			})
			// Update
			.addCase(updateEvent.fulfilled, (state, action) => {
				const index = state.items.findIndex(
					(e) => e.id === action.payload.id
				);
				if (index !== -1) {
					state.items[index] = action.payload;
				}
			})
			// Delete
			.addCase(deleteEvent.fulfilled, (state, action) => {
				state.items = state.items.filter(
					(e) => e.id !== action.payload
				);
			})
			// Relational Updates
			.addCase(addEventSpeaker.fulfilled, (state, action) => {
				const event = state.items.find(
					(e) => e.id === action.meta.arg.eventId
				);
				if (event) {
					if (!event.speakers) event.speakers = [];
					event.speakers.push(action.payload);
				}
			})
			.addCase(deleteEventSpeaker.fulfilled, (state, action) => {
				const event = state.items.find(
					(e) => e.id === action.meta.arg.eventId
				);
				if (event && event.speakers) {
					event.speakers = event.speakers.filter(
						(s) => s.id !== action.payload
					);
				}
			})
			.addCase(addEventSponsor.fulfilled, (state, action) => {
				const event = state.items.find(
					(e) => e.id === action.meta.arg.eventId
				);
				if (event) {
					if (!event.sponsors) event.sponsors = [];
					event.sponsors.push(action.payload);
				}
			})
			.addCase(deleteEventSponsor.fulfilled, (state, action) => {
				const event = state.items.find(
					(e) => e.id === action.meta.arg.eventId
				);
				if (event && event.sponsors) {
					event.sponsors = event.sponsors.filter(
						(s) => s.id !== action.payload
					);
				}
			})
			.addCase(addEventTicket.fulfilled, (state, action) => {
				const event = state.items.find(
					(e) => e.id === action.meta.arg.eventId
				);
				if (event) {
					if (!event.tickets) event.tickets = [];
					event.tickets.push(action.payload);
				}
			})
			.addCase(deleteEventTicket.fulfilled, (state, action) => {
				const event = state.items.find(
					(e) => e.id === action.meta.arg.eventId
				);
				if (event && event.tickets) {
					event.tickets = event.tickets.filter(
						(t) => t.id !== action.payload
					);
				}
			});
	},
});

export default eventsSlice.reducer;
