"use client";

import React, { useState } from "react";
import {
	Calendar,
	Music,
	BookOpen,
	Palette,
	Trophy,
	Film,
	Users,
} from "lucide-react";
import EventCard from "../../ui/EventCard";

const categories = [
	{ id: "all", label: "All Events" },
	{ id: "art", label: "Art & Exhibitions" },
	{ id: "music", label: "Music & Live" },
	{ id: "workshops", label: "Workshops" },
	{ id: "community", label: "Community" },
];

const eventsData = [
	{
		id: 1,
		category: "art",
		day: "12",
		month: "SEP",
		dateFull: "Wed, 12 September, 2025 • 2pm - 5:30pm",
		title: "Modern African Art Exhibition",
		description:
			"Experience a curated collection of contemporary African art featuring emerging artists from across the continent. Join us for an evening of culture, conversation, and creativity.",
		imageUrl:
			"https://images.unsplash.com/photo-1561489396-888724a1543d?w=800&auto=format&fit=crop&q=60",
		categoryIcon: <Palette size={20} />,
		categoryColor: "#FFD700",
	},
	{
		id: 2,
		category: "music",
		day: "15",
		month: "SEP",
		dateFull: "Sat, 15 September, 2025 • 6pm - 10pm",
		title: "Acoustic Soul Night",
		description:
			"An intimate evening of live acoustic performances by local talents. Enjoy soulful melodies under the stars in our open-air amphitheater.",
		imageUrl:
			"https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60",
		categoryIcon: <Music size={20} />,
		categoryColor: "#FF6B6B",
	},
	{
		id: 3,
		category: "workshops",
		day: "20",
		month: "SEP",
		dateFull: "Thu, 20 September, 2025 • 10am - 1pm",
		title: "Digital Storytelling Workshop",
		description:
			"Learn the art of digital storytelling with industry experts. This hands-on workshop covers scriptwriting, filming techniques, and editing basics.",
		imageUrl:
			"https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60",
		categoryIcon: <BookOpen size={20} />,
		categoryColor: "#4ECDC4",
	},
	{
		id: 4,
		category: "community",
		day: "25",
		month: "SEP",
		dateFull: "Tue, 25 September, 2025 • 9am - 12pm",
		title: "Community Clean-up Drive",
		description:
			"Join hands with us to make our neighborhood cleaner and greener. A community initiative to promote environmental awareness and civic responsibility.",
		imageUrl:
			"https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=60",
		categoryIcon: <Trophy size={20} />,
		categoryColor: "#95A5A6",
	},
	{
		id: 5,
		category: "art",
		day: "05",
		month: "OCT",
		dateFull: "Fri, 05 October, 2025 • 5pm - 8pm",
		title: "Film Screening: African Narratives",
		description:
			"A special screening of award-winning short films by young African directors. Followed by a Q&A session with the filmmakers.",
		imageUrl:
			"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=60",
		categoryIcon: <Film size={20} />,
		categoryColor: "#A8D0E6",
	},
];

export default function EventsList() {
	const [activeCategory, setActiveCategory] = useState("all");

	const filteredEvents =
		activeCategory === "all"
			? eventsData
			: eventsData.filter((event) => event.category === activeCategory);

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
							<EventCard key={event.id} {...event} />
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
