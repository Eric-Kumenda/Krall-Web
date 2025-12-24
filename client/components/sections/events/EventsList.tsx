"use client";

import React, { useState, useEffect } from "react";
import {
	Calendar,
	Music,
	BookOpen,
	Palette,
	Trophy,
	Film,
	Users,
	Loader2,
} from "lucide-react";
import EventCard from "../../ui/EventCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchEvents } from "@/store/slices/eventsSlice";

const categories = [
	{ id: "all", label: "All Events" },
	{ id: "art", label: "Art & Exhibitions" },
	{ id: "music", label: "Music & Live" },
	{ id: "workshops", label: "Workshops" },
	{ id: "community", label: "Community" },
];

const iconMap: Record<string, React.ReactNode> = {
	Palette: <Palette size={20} />,
	Users: <Users size={20} />,
	Music: <Music size={20} />,
	Mic: <Music size={20} />, // Fallback
	Film: <Film size={20} />,
	Trophy: <Trophy size={20} />,
	BookOpen: <BookOpen size={20} />,
};

export default function EventsList() {
	const [activeCategory, setActiveCategory] = useState("all");
	const dispatch = useAppDispatch();
	const { events, loading, error } = useAppSelector((state) => state.events);

	useEffect(() => {
		dispatch(fetchEvents());
	}, [dispatch]);

	const filteredEvents =
		activeCategory === "all"
			? events
			: events.filter(
					(event) =>
						event.category.toLowerCase() ===
						activeCategory.toLowerCase()
			  );

	if (loading) {
		return (
			<section className="py-20 bg-gray-900 min-h-screen flex items-center justify-center">
				<Loader2 className="w-10 h-10 text-primary animate-spin" />
			</section>
		);
	}

	if (error) {
		return (
			<section className="py-20 bg-gray-900 min-h-screen flex items-center justify-center">
				<div className="text-center text-red-400">
					<p>Error loading events</p>
					<p className="text-sm text-gray-500">{error}</p>
				</div>
			</section>
		);
	}

	return (
		<section className="py-20 bg-gray-900 min-h-screen">
			<div className="container mx-auto px-4">
				{/* Filter Bar */}
				<div className="flex flex-wrap justify-center gap-3 mb-16">
					{categories.map((cat) => (
						<button
							key={cat.id}
							onClick={() => setActiveCategory(cat.id)}
							className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
								activeCategory === cat.id
									? "bg-primary text-gray-900 shadow-lg shadow-primary/20 scale-105"
									: "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
							}`}>
							{cat.label}
						</button>
					))}
				</div>

				{/* Events Grid */}
				<div className="max-w-5xl mx-auto space-y-6">
					{filteredEvents.length > 0 ? (
						filteredEvents.map((event) => (
							<EventCard
								key={event.id}
								{...event}
								categoryIcon={
									iconMap[event.categoryIconName] || (
										<Users size={20} />
									)
								}
							/>
						))
					) : (
						<div className="text-center py-20">
							<div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-600">
								<Calendar size={40} />
							</div>
							<h3 className="text-xl font-bold text-white mb-2">
								No events found
							</h3>
							<p className="text-gray-400">
								Check back later for updates in this category.
							</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
