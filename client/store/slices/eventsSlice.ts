import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Speaker {
	name: string;
	role: string;
	avatar_url: string;
	socials: {
		linkedin?: string;
		instagram?: string;
		facebook?: string;
		twitter?: string;
	};
}

export interface Sponsor {
	name: string;
	logo_url: string;
	websiteUrl: string;
}

export interface Ticket {
	type: string;
	price: number;
	available: boolean;
}

export interface Event {
	id: string | number;
	category: string;
	day: string;
	month: string;
	dateFull: string;
	title: string;
	description: string;
	imageUrl: string;
	categoryIconName:
		| "Palette"
		| "Users"
		| "Music"
		| "Mic"
		| "Film"
		| "Trophy"
		| "BookOpen";
	categoryColor: string;
	time: string;
	location: string;
	venue: string;
	phone: string;
	email: string;
	speakers: Speaker[];
	sponsors: Sponsor[];
	tickets: Ticket[];
	what_to_expect: string[];
}

interface EventsState {
	events: Event[];
	loading: boolean;
	error: string | null;
}

const API_URL =
	process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:3000/api";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
	try {
		const response = await fetch(`${API_URL}/events?published=true`);
		if (!response.ok) throw new Error("Failed to fetch events");
		const data = await response.json();

		// Transform data to match UI expected format if needed
		// Assuming API returns list of { id, title, description, date, location, image_url, ... }
		// We need to map it to the Event interface
		return data.map(
			(e: any) =>
				({
					id: e.id,
					title: e.title,
					description: e.description,
					dateFull: new Date(e.date).toLocaleDateString(undefined, {
						weekday: "short",
						day: "numeric",
						month: "long",
						year: "numeric",
					}),
					day: new Date(e.date).getDate().toString(),
					month: new Date(e.date)
						.toLocaleString("default", { month: "short" })
						.toUpperCase(),
					time: new Date(e.date).toLocaleTimeString(undefined, {
						hour: "2-digit",
						minute: "2-digit",
					}),
					location: e.location,
					venue: e.venue || e.location,
					imageUrl: e.image_url,
					category: e.category || "General",
					categoryColor: "#4ECDC4", // Default or map based on category
					categoryIconName: "Users", // Default
					phone: e.phone || "",
					email: e.email || "",
					speakers: e.speakers || [],
					sponsors: e.sponsors || [],
					tickets: e.tickets || [],
					what_to_expect: e.what_to_expect || [],
				} as Event)
		);
	} catch (error: any) {
		throw new Error(error.message || "Failed to fetch events");
	}
});

export const fetchEventById = createAsyncThunk(
	"events/fetchEventById",
	async (id: string) => {
		try {
			const response = await fetch(`${API_URL}/events/${id}`);
			if (!response.ok) throw new Error("Failed to fetch event");
			const e = await response.json();

			return {
				id: e.id,
				title: e.title,
				description: e.description,
				dateFull: new Date(e.date).toLocaleDateString(undefined, {
					weekday: "short",
					day: "numeric",
					month: "long",
					year: "numeric",
				}),
				day: new Date(e.date).getDate().toString(),
				month: new Date(e.date)
					.toLocaleString("default", { month: "short" })
					.toUpperCase(),
				time: new Date(e.date).toLocaleTimeString(undefined, {
					hour: "2-digit",
					minute: "2-digit",
				}),
				location: e.location,
				venue: e.venue || e.location,
				imageUrl: e.image_url,
				category: e.category || "General",
				categoryColor: "#4ECDC4",
				categoryIconName: "Users",
				phone: e.phone || "",
				email: e.email || "",
				speakers: e.speakers || [],
				sponsors: e.sponsors || [],
				tickets: e.tickets || [],
				what_to_expect: e.what_to_expect || [],
			} as Event;
		} catch (error: any) {
			throw new Error(error.message || "Failed to fetch event");
		}
	}
);

const initialState: EventsState = {
	events: [],
	loading: false,
	error: null,
};

const eventsSlice = createSlice({
	name: "events",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchEvents.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchEvents.fulfilled, (state, action) => {
				state.loading = false;
				state.events = action.payload;
			})
			.addCase(fetchEvents.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch events";
			})
			.addCase(fetchEventById.fulfilled, (state, action) => {
				const index = state.events.findIndex(
					(e) => e.id === action.payload.id
				);
				if (index !== -1) {
					state.events[index] = action.payload;
				} else {
					state.events.push(action.payload);
				}
			});
	},
});

export const selectEvents = (state: RootState) => state.events.events;
export const selectEventById = (state: RootState, id: string | number) =>
	state.events.events.find((event) => event.id.toString() === id.toString());

export default eventsSlice.reducer;
