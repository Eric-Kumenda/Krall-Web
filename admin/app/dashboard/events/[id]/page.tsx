"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
	ArrowLeft,
	Edit,
	Calendar,
	MapPin,
	Users,
	Ticket,
	Phone,
	Mail,
	FileText,
} from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchEventById } from "@/store/slices/eventsSlice";
// Attendees component
import AttendeesPage from "./attendees/page";

export default function EventViewPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const dispatch = useAppDispatch();

	// We can fetch details here or rely on the slice
	const { items, loading, error } = useAppSelector((state) => state.events);
	// Since fetchEventById might push to items, we find it there
	const event = items.find((e) => e.id === id);

	useEffect(() => {
		dispatch(fetchEventById(id));
	}, [dispatch, id]);

	if (loading && !event) {
		return (
			<div className="flex justify-center items-center h-96">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (!event) {
		return (
			<div className="text-center py-12">
				<h2 className="text-2xl font-bold text-gray-400">
					Event not found
				</h2>
				<Link
					href="/dashboard/events"
					className="text-primary hover:underline mt-4 inline-block">
					Back to Events
				</Link>
			</div>
		);
	}

	// Helper to parse JSONB columns if needed (though slice should handle it if typed correctly)
	// For now assuming the types in slice will be updated to match API
	const speakers = (event as any).speakers || [];
	const sponsors = (event as any).sponsors || [];
	const tickets = (event as any).tickets || [];
	const expectations = (event as any).what_to_expect || [];

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
			{/* Header */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div className="flex items-center gap-4">
					<Link
						href="/dashboard/events"
						className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
						<ArrowLeft size={24} />
					</Link>
					<div>
						<h1 className="text-3xl font-bold font-montserrat text-white">
							{event.title}
						</h1>
						<div className="flex items-center gap-4 mt-2 text-gray-400">
							<span
								className={`px-2 py-0.5 text-xs rounded-full ${
									event.is_published
										? "bg-green-500/20 text-green-400"
										: "bg-yellow-500/20 text-yellow-400"
								}`}>
								{event.is_published ? "Published" : "Draft"}
							</span>
							<div className="flex items-center gap-1 text-sm">
								<Calendar size={14} />
								{new Date(event.date).toLocaleDateString()}
							</div>
							<div className="flex items-center gap-1 text-sm">
								<MapPin size={14} />
								{event.location}
							</div>
						</div>
					</div>
				</div>
				<Link
					href={`/dashboard/events/${id}/edit`}
					className="flex items-center gap-2 px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors border border-gray-700">
					<Edit size={18} />
					Edit Event
				</Link>
			</div>

			{/* Main Info Cards */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Basic Info */}
				<div className="lg:col-span-2 space-y-6">
					<div className="glass-card p-6 rounded-2xl space-y-4">
						<h3 className="text-lg font-bold text-white border-b border-gray-700 pb-2">
							Overview
						</h3>
						<p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
							{event.description}
						</p>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
							<div className="flex items-center gap-2 text-gray-400">
								<FileText size={16} />
								<span className="font-bold text-white">
									Category:
								</span>{" "}
								{(event as any).category || "N/A"}
							</div>
							<div className="flex items-center gap-2 text-gray-400">
								<Users size={16} />
								<span className="font-bold text-white">
									Venue:
								</span>{" "}
								{(event as any).venue || "N/A"}
							</div>
							<div className="flex items-center gap-2 text-gray-400">
								<Phone size={16} />
								<span className="font-bold text-white">
									Phone:
								</span>{" "}
								{(event as any).phone || "N/A"}
							</div>
							<div className="flex items-center gap-2 text-gray-400">
								<Mail size={16} />
								<span className="font-bold text-white">
									Email:
								</span>{" "}
								{(event as any).email || "N/A"}
							</div>
						</div>
					</div>

					{/* Speakers */}
					<div className="glass-card p-6 rounded-2xl space-y-4">
						<h3 className="text-lg font-bold text-white border-b border-gray-700 pb-2 flex justify-between items-center">
							Speakers
							<span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
								{speakers.length}
							</span>
						</h3>
						{speakers.length === 0 ? (
							<p className="text-gray-500 italic">
								No speakers added yet.
							</p>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{speakers.map((speaker: any) => (
									<div
										key={speaker.id}
										className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
										<div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
											{speaker.avatar_url ? (
												<Image
													src={speaker.avatar_url}
													alt={speaker.name}
													fill
													className="object-cover"
													unoptimized={true}
												/>
											) : (
												<Users
													size={20}
													className="w-full h-full p-3 text-gray-400"
												/>
											)}
										</div>
										<div>
											<div className="font-bold text-white">
												{speaker.name}
											</div>
											<div className="text-xs text-primary">
												{speaker.role}
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Sponsors */}
					<div className="glass-card p-6 rounded-2xl space-y-4">
						<h3 className="text-lg font-bold text-white border-b border-gray-700 pb-2 flex justify-between items-center">
							Sponsors
							<span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
								{sponsors.length}
							</span>
						</h3>
						{sponsors.length === 0 ? (
							<p className="text-gray-500 italic">
								No sponsors added yet.
							</p>
						) : (
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{sponsors.map((sponsor: any) => (
									<div
										key={sponsor.id}
										className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
										<div className="relative w-16 h-16 rounded-md overflow-hidden bg-white flex items-center justify-center">
											{sponsor.logo_url ? (
												<Image
													src={sponsor.logo_url}
													alt={sponsor.name}
													fill
													className="object-contain p-1"
													unoptimized={true}
												/>
											) : (
												<span className="text-black font-bold text-xs">
													{sponsor.name}
												</span>
											)}
										</div>
										<span className="text-xs text-gray-300 truncate w-full text-center">
											{sponsor.name}
										</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Sidebar Info */}
				<div className="space-y-6">
					{/* Image */}
					<div className="glass-card p-4 rounded-2xl">
						<h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
							Event Cover
						</h3>
						<div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-800">
							{event.image_url ? (
								<Image
									src={event.image_url}
									alt={event.title}
									fill
									className="object-cover"
									unoptimized={true}
								/>
							) : (
								<div className="flex items-center justify-center w-full h-full text-gray-600">
									<Calendar size={32} />
								</div>
							)}
						</div>
					</div>

					{/* Tickets Info */}
					<div className="glass-card p-6 rounded-2xl space-y-4">
						<h3 className="text-lg font-bold text-white border-b border-gray-700 pb-2">
							Tickets
						</h3>
						<div className="flex items-center justify-between">
							<span className="text-gray-400">
								Total Available
							</span>
							<span className="font-bold text-white">
								{event.tickets_available}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-gray-400">Sold</span>
							<span className="font-bold text-primary">
								{event.tickets_sold}
							</span>
						</div>

						{/* Ticket Types */}
						<div className="space-y-2 pt-2 border-t border-gray-700/50">
							{tickets.length > 0 ? (
								tickets.map((t: any) => (
									<div
										key={t.id}
										className="flex justify-between items-center text-sm">
										<span className="text-white">
											{t.type}
										</span>
										<span className="text-gray-400">
											KES {t.price}
										</span>
									</div>
								))
							) : (
								<div className="text-sm text-gray-500 italic">
									No specific ticket types defined (using
									default base price: {event.price})
								</div>
							)}
						</div>
					</div>

					{/* What to Expect - simplified view */}
					<div className="glass-card p-6 rounded-2xl space-y-4">
						<h3 className="text-lg font-bold text-white border-b border-gray-700 pb-2">
							What to Expect
						</h3>
						{expectations.length > 0 ? (
							<ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
								{expectations.map((item: string, i: number) => (
									<li key={i}>{item}</li>
								))}
							</ul>
						) : (
							<p className="text-gray-500 italic text-sm">
								No highlights added.
							</p>
						)}
					</div>
				</div>
			</div>

			{/* Attendees Section (Reusing existing page logic by importing or embedding) */}
			{/* Since we can't easily nest pages in Next.js App Router without layout/structure changes, 
          we'll just render the AttendeesPage content here or link to it. 
          Given the user requirement "They can see the registered attendees there", embedding is best.
          However, AttendeesPage is a default export page component. We might need to refactor it to be a component.
          For now, let's assume we can just render the list or better, keep the link to the dedicated attendees page 
          OR we can import the default export from ./attendees/page.tsx.
          But page.tsx hooks might expect params. Let's see if we can use it.
          The ./attendees/page.tsx probably uses params.id.
      */}
			<div className="pt-8 border-t border-gray-800">
				<h2 className="text-2xl font-bold text-white mb-6">
					Registered Attendees
				</h2>
				<AttendeesPage />
			</div>
		</div>
	);
}
