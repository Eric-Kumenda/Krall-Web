"use client";

import { useEffect, useState } from "react";
import {
	Plus,
	Search,
	Edit,
	Trash2,
	Eye,
	EyeOff,
	Calendar as CalendarIcon,
	MapPin,
	Ticket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	fetchEvents,
	updateEvent,
	deleteEvent,
} from "@/store/slices/eventsSlice";

export default function EventsPage() {
	const dispatch = useAppDispatch();
	const { items: events, loading } = useAppSelector((state) => state.events);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		dispatch(fetchEvents());
	}, [dispatch]);

	const togglePublish = async (id: string, currentState: boolean) => {
		const formData = new FormData();
		formData.append("is_published", (!currentState).toString());
		dispatch(updateEvent({ id, data: formData }));
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this event?")) return;
		dispatch(deleteEvent(id));
	};

	const filteredEvents = events.filter(
		(event) =>
			event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			event.location?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold font-montserrat text-white">
						Events
					</h1>
					<p className="text-gray-400 mt-1">
						Manage your events and tickets
					</p>
				</div>
				<Link
					href="/dashboard/events/new"
					className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-yellow-400 text-black font-bold rounded-xl transition-all">
					<Plus size={20} />
					Create Event
				</Link>
			</div>

			{/* Search and Filter */}
			<div className="glass-card p-4 rounded-xl flex items-center gap-4">
				<Search className="text-gray-400" size={20} />
				<input
					type="text"
					placeholder="Search events..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 w-full"
				/>
			</div>

			{/* Events List */}
			{loading && events.length === 0 ? (
				<div className="text-center py-12 text-gray-500">
					Loading events...
				</div>
			) : filteredEvents.length === 0 ? (
				<div className="text-center py-12 glass-card rounded-2xl">
					<p className="text-gray-400 mb-4">No events found</p>
					<Link
						href="/dashboard/events/new"
						className="text-primary hover:underline">
						Create your first event
					</Link>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4">
					{filteredEvents.map((event) => (
						<div
							key={event.id}
							className="glass-card p-4 rounded-xl flex flex-col md:flex-row gap-6 items-start md:items-center group hover:border-primary/30 transition-colors">
							{/* Image */}
							<div className="w-full md:w-32 h-32 md:h-24 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
								{event.image_url ? (
									<Image
										src={event.image_url}
										alt={event.title}
										width={128}
										height={96}
										className="object-cover w-full h-full"
										unoptimized={true}
									/>
								) : (
									<div className="w-full h-full flex items-center justify-center text-gray-600">
										<CalendarIcon size={24} />
									</div>
								)}
							</div>

							{/* Details */}
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-3 mb-1">
									<Link
										href={`/dashboard/events/${event.id}`}>
										<h3 className="text-xl font-bold text-white truncate">
											{event.title}
										</h3>
									</Link>
									<span
										className={`px-2 py-0.5 text-xs rounded-full ${
											event.is_published
												? "bg-green-500/20 text-green-400"
												: "bg-yellow-500/20 text-yellow-400"
										}`}>
										{event.is_published
											? "Published"
											: "Draft"}
									</span>
								</div>

								<div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-2">
									<div className="flex items-center gap-1">
										<CalendarIcon size={14} />
										{new Date(
											event.date
										).toLocaleDateString()}
									</div>
									<div className="flex items-center gap-1">
										<MapPin size={14} />
										{event.location || "TBD"}
									</div>
									<div className="flex items-center gap-1">
										<Ticket size={14} />
										{event.tickets_sold} /{" "}
										{event.tickets_available} sold
									</div>
								</div>
							</div>

							{/* Actions */}
							<div className="flex items-center gap-2 w-full md:w-auto justify-end">
								<button
									onClick={() =>
										togglePublish(
											event.id,
											event.is_published
										)
									}
									className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
									title={
										event.is_published
											? "Unpublish"
											: "Publish"
									}>
									{event.is_published ? (
										<Eye size={20} />
									) : (
										<EyeOff size={20} />
									)}
								</button>
								<Link
									href={`/dashboard/events/${event.id}/edit`}
									className="p-2 rounded-lg hover:bg-gray-700 text-blue-400 hover:text-blue-300 transition-colors"
									title="Edit">
									<Edit size={20} />
								</Link>
								<button
									onClick={() => handleDelete(event.id)}
									className="p-2 rounded-lg hover:bg-gray-700 text-red-400 hover:text-red-300 transition-colors"
									title="Delete">
									<Trash2 size={20} />
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
