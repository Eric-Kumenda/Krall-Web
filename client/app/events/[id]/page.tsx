"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
	Calendar,
	MapPin,
	Clock,
	Phone,
	Mail,
	Linkedin,
	Instagram,
	Facebook,
	Twitter,
	CheckCircle,
	Minus,
	Plus,
} from "lucide-react";
import { fetchEventById, selectEventById } from "@/store/slices/eventsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CustomSelect from "@/components/ui/CustomSelect";

export default function EventDetailsPage() {
	const params = useParams();
	const router = useRouter();
	const id = params.id as string;
	const dispatch = useAppDispatch();
	const event = useAppSelector((state) => selectEventById(state, id));

	useEffect(() => {
		if (id) {
			dispatch(fetchEventById(id));
		}
	}, [dispatch, id]);

	const [ticketQuantity, setTicketQuantity] = useState(1);
	const [selectedTicket, setSelectedTicket] = useState("");

	if (!event) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-4">Event not found</h2>
					<Link href="/" className="text-primary hover:underline">
						Return Home
					</Link>
				</div>
			</div>
		);
	}

	const selectedTicketData = event.tickets.find(
		(t) => t.type === selectedTicket
	);
	const totalPrice = selectedTicketData
		? selectedTicketData.price * ticketQuantity
		: 0;

	return (
		<div className="bg-gray-900 min-h-screen pt-24 pb-20">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-8">
						{/* Hero Image */}
						<div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
							<Image
								src={event.imageUrl}
								alt={event.title}
								fill
								className="object-cover"
								priority
								unoptimized={true}
							/>
							<div className="absolute top-4 left-4 bg-primary text-black font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
								{event.category}
							</div>
						</div>

						{/* Title & Description */}
						<div>
							<h1 className="text-3xl md:text-4xl font-bold text-white font-montserrat mb-4">
								{event.title}
							</h1>
							<div className="prose prose-invert max-w-none text-gray-300">
								<h3 className="text-xl font-bold text-white mt-6 mb-3">
									About This Event
								</h3>
								<p>{event.description}</p>
							</div>
						</div>

						{/* What to Expect */}
						{event.what_to_expect &&
							event.what_to_expect.length > 0 && (
								<div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
									<h3 className="text-xl font-bold text-white mb-4 font-montserrat">
										What to Expect
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{event.what_to_expect.map(
											(item, index) => (
												<div
													key={index}
													className="flex items-start gap-3">
													<CheckCircle
														className="text-primary flex-shrink-0 mt-1"
														size={20}
													/>
													<span className="text-gray-300">
														{item}
													</span>
												</div>
											)
										)}
									</div>
								</div>
							)}

						{/* Speakers */}
						{event.speakers.length > 0 && (
							<div>
								<h3 className="text-2xl font-bold text-white mb-6 font-montserrat border-b border-white/10 pb-2">
									Event Speakers
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{event.speakers.map((speaker, index) => (
										<div
											key={index}
											className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
											<div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/50">
												{speaker.avatar_url && (
													<Image
														src={speaker.avatar_url}
														alt={speaker.name}
														fill
														className="object-cover"
														unoptimized={true}
													/>
												)}
											</div>
											<div>
												<h4 className="font-bold text-white font-montserrat">
													{speaker.name}
												</h4>
												<p className="text-primary text-sm mb-2">
													{speaker.role}
												</p>
												<div className="flex gap-2">
													{speaker.socials
														.linkedin && (
														<Link
															href={
																speaker.socials
																	.linkedin
															}
															className="text-gray-400 hover:text-white">
															<Linkedin
																size={16}
															/>
														</Link>
													)}
													{speaker.socials
														.instagram && (
														<Link
															href={
																speaker.socials
																	.instagram
															}
															className="text-gray-400 hover:text-white">
															<Instagram
																size={16}
															/>
														</Link>
													)}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Information Card */}
						<div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm ">
							<h3 className="text-xl font-bold text-white mb-4 font-montserrat border-b-2 border-primary inline-block pb-1">
								Information
							</h3>

							<div className="space-y-4">
								<div className="flex items-start gap-3 border-b border-white/5 pb-3">
									<Calendar
										className="text-primary mt-1"
										size={20}
									/>
									<div>
										<span className="block font-bold text-white">
											Date
										</span>
										<span className="text-gray-400">
											{event.dateFull}
										</span>
									</div>
								</div>

								<div className="flex items-start gap-3 border-b border-white/5 pb-3">
									<Clock
										className="text-primary mt-1"
										size={20}
									/>
									<div>
										<span className="block font-bold text-white">
											Time
										</span>
										<span className="text-gray-400">
											{event.time}
										</span>
									</div>
								</div>

								<div className="flex items-start gap-3 border-b border-white/5 pb-3">
									<MapPin
										className="text-primary mt-1"
										size={20}
									/>
									<div>
										<span className="block font-bold text-white">
											Location
										</span>
										<span className="text-gray-400">
											{event.venue}, {event.location}
										</span>
									</div>
								</div>

								<div className="flex items-start gap-3 border-b border-white/5 pb-3">
									<Phone
										className="text-primary mt-1"
										size={20}
									/>
									<div>
										<span className="block font-bold text-white">
											Phone
										</span>
										<span className="text-gray-400">
											{event.phone}
										</span>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<Mail
										className="text-primary mt-1"
										size={20}
									/>
									<div>
										<span className="block font-bold text-white">
											Email
										</span>
										<span className="text-gray-400">
											{event.email}
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Registration Card */}
						<div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative z-20">
							<h3 className="text-xl font-bold text-white mb-4 font-montserrat border-b-2 border-primary inline-block pb-1">
								Registration
							</h3>

							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-400 mb-2">
										Select Ticket Type
									</label>
									<CustomSelect
										options={event.tickets.map(
											(ticket) => ({
												label: `${
													ticket.type
												} - KES ${ticket.price.toLocaleString()}`,
												value: ticket.type,
											})
										)}
										value={selectedTicket}
										onChange={setSelectedTicket}
										placeholder="Select Option"
									/>
								</div>

								{selectedTicket && (
									<div className="bg-black/30 rounded-xl p-4 border border-white/5">
										<div className="flex justify-between items-center mb-4">
											<div>
												<div className="text-2xl font-bold text-white">
													KES{" "}
													{selectedTicketData?.price.toLocaleString()}
												</div>
												<div className="text-xs text-primary uppercase tracking-wider">
													Per Ticket
												</div>
											</div>

											<div className="flex items-center gap-3 bg-white/5 rounded-lg p-1">
												<button
													onClick={() =>
														setTicketQuantity(
															Math.max(
																1,
																ticketQuantity -
																	1
															)
														)
													}
													className="p-1 hover:bg-white/10 rounded-md transition-colors text-white">
													<Minus size={16} />
												</button>
												<span className="font-bold text-white w-4 text-center">
													{ticketQuantity}
												</span>
												<button
													onClick={() =>
														setTicketQuantity(
															ticketQuantity + 1
														)
													}
													className="p-1 hover:bg-white/10 rounded-md transition-colors text-white">
													<Plus size={16} />
												</button>
											</div>
										</div>

										<div className="border-t border-white/10 pt-3 space-y-2">
											<div className="flex justify-between text-sm">
												<span className="text-gray-400">
													Quantity:
												</span>
												<span className="text-white font-bold">
													{ticketQuantity}
												</span>
											</div>
											<div className="flex justify-between text-sm">
												<span className="text-gray-400">
													Total:
												</span>
												<span className="text-primary font-bold">
													KES{" "}
													{totalPrice.toLocaleString()}
												</span>
											</div>
										</div>

										<button
											onClick={() => {
												const tickets = JSON.stringify([
													{
														type: selectedTicket,
														quantity:
															ticketQuantity,
													},
												]);
												router.push(
													`/events/${id}/checkout?tickets=${encodeURIComponent(
														tickets
													)}`
												);
											}}
											className="w-full bg-primary text-black font-bold py-3 rounded-lg mt-4 hover:bg-primary/90 transition-colors font-montserrat">
											Purchase Now
										</button>
									</div>
								)}
							</div>
						</div>

						{/* Sponsors (Mini) */}
						{event.sponsors && event.sponsors.length > 0 && (
							<div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative z-10">
								<h3 className="text-lg font-bold text-white mb-4 font-montserrat">
									Sponsors
								</h3>
								<div className="grid grid-cols-3 gap-2">
									{event.sponsors.map((sponsor, i) => (
										<a
											key={i}
											href={sponsor.websiteUrl || "#"}
											target="_blank"
											rel="noopener noreferrer"
											className="aspect-square bg-white/10 rounded-lg flex items-center justify-center p-2 hover:bg-white/20 transition-colors relative overflow-hidden group"
											title={sponsor.name}>
											{sponsor.logo_url ? (
												<Image
													src={sponsor.logo_url}
													alt={sponsor.name}
													fill
													className="object-contain p-2"
													unoptimized={true}
												/>
											) : (
												<span className="text-xs text-gray-400 text-center font-bold">
													{sponsor.name}
												</span>
											)}
										</a>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
