"use client";

import { useState } from "react";
import {
	Plus,
	Trash2,
	User,
	Upload,
	Ticket,
	Link as LinkIcon,
} from "lucide-react";
import Image from "next/image";
import { useAppDispatch } from "@/store/hooks";
import {
	addEventSpeaker,
	deleteEventSpeaker,
	addEventSponsor,
	deleteEventSponsor,
	addEventTicket,
	deleteEventTicket,
} from "@/store/slices/eventsSlice";

// --- Speakers Manager ---
export const SpeakersManager = ({
	eventId,
	speakers,
}: {
	eventId: string;
	speakers: any[];
}) => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [role, setRole] = useState("");
	const [avatar, setAvatar] = useState<File | null>(null);

	const handleAdd = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name) return;
		setLoading(true);
		const formData = new FormData();
		formData.append("name", name);
		formData.append("role", role);
		if (avatar) formData.append("avatar", avatar);

		try {
			await dispatch(
				addEventSpeaker({ eventId, data: formData })
			).unwrap();
			setName("");
			setRole("");
			setAvatar(null);
		} catch (err) {
			console.error(err);
			alert("Failed to add speaker");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Remove this speaker?")) return;
		await dispatch(deleteEventSpeaker({ eventId, speakerId: id }));
	};

	return (
		<div className="space-y-6">
			{/* List */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{speakers?.map((speaker) => (
					<div
						key={speaker.id}
						className="glass-card p-3 rounded-xl flex items-center gap-4 border border-gray-700/50">
						<div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800 relative flex-shrink-0">
							{speaker.avatar_url ? (
								<Image
									src={speaker.avatar_url}
									alt={speaker.name}
									fill
									className="object-cover"
									unoptimized={true}
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center text-gray-500">
									<User size={20} />
								</div>
							)}
						</div>
						<div className="flex-1 min-w-0">
							<h4 className="font-bold text-white truncate">
								{speaker.name}
							</h4>
							<p className="text-xs text-primary truncate">
								{speaker.role}
							</p>
						</div>
						<button
							onClick={() => handleDelete(speaker.id)}
							className="p-2 text-gray-500 hover:text-red-400 transition-colors">
							<Trash2 size={16} />
						</button>
					</div>
				))}
				{(!speakers || speakers.length === 0) && (
					<div className="col-span-full text-center py-8 text-gray-500 bg-gray-900/30 rounded-xl border border-dashed border-gray-800">
						No speakers added yet.
					</div>
				)}
			</div>

			{/* Add Form */}
			<div className="border-t border-gray-700/50 pt-6">
				<h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
					Add New Speaker
				</h4>
				<form onSubmit={handleAdd} className="flex flex-col gap-4">
					<div className="flex flex-col md:flex-row gap-4">
						<input
							type="text"
							placeholder="Speaker Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="flex-1 px-4 py-2 rounded-xl glass-input focus:ring-1 focus:ring-primary/50"
							required
						/>
						<input
							type="text"
							placeholder="Role / Title"
							value={role}
							onChange={(e) => setRole(e.target.value)}
							className="flex-1 px-4 py-2 rounded-xl glass-input focus:ring-1 focus:ring-primary/50"
						/>
					</div>
					<div className="flex items-center gap-4">
						<input
							type="file"
							accept="image/*"
							onChange={(e) =>
								setAvatar(e.target.files?.[0] || null)
							}
							className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
						/>
						<button
							type="submit"
							disabled={loading}
							className="ml-auto px-6 py-2 bg-primary text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors disabled:opacity-50 text-sm">
							{loading ? "Adding..." : "Add Speaker"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

// --- Sponsors Manager ---
export const SponsorsManager = ({
	eventId,
	sponsors,
}: {
	eventId: string;
	sponsors: any[];
}) => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [website, setWebsite] = useState("");
	const [logo, setLogo] = useState<File | null>(null);

	const handleAdd = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name) return;
		setLoading(true);
		const formData = new FormData();
		formData.append("name", name);
		formData.append("website_url", website);
		if (logo) formData.append("logo", logo);

		try {
			await dispatch(
				addEventSponsor({ eventId, data: formData })
			).unwrap();
			setName("");
			setWebsite("");
			setLogo(null);
		} catch (err) {
			console.error(err);
			alert("Failed to add sponsor");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Remove this sponsor?")) return;
		await dispatch(deleteEventSponsor({ eventId, sponsorId: id }));
	};

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				{sponsors?.map((sponsor) => (
					<div
						key={sponsor.id}
						className="glass-card p-3 rounded-xl flex flex-col items-center gap-2 border border-gray-700/50 text-center relative group">
						<div className="w-16 h-16 rounded-lg overflow-hidden bg-white/5 p-1 relative">
							{sponsor.logo_url ? (
								<Image
									src={sponsor.logo_url}
									alt={sponsor.name}
									fill
									className="object-contain"
									unoptimized={true}
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center text-gray-500 text-xs font-bold">
									{sponsor.name[0]}
								</div>
							)}
						</div>
						<div className="w-full">
							<h4 className="font-bold text-white text-sm truncate">
								{sponsor.name}
							</h4>
							{sponsor.website_url && (
								<a
									href={sponsor.website_url}
									target="_blank"
									className="text-xs text-primary truncate block hover:underline">
									{sponsor.website_url}
								</a>
							)}
						</div>
						<button
							onClick={() => handleDelete(sponsor.id)}
							className="absolute top-1 right-1 p-1.5 bg-gray-900/80 rounded-full text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
							<Trash2 size={12} />
						</button>
					</div>
				))}
				{(!sponsors || sponsors.length === 0) && (
					<div className="col-span-full text-center py-8 text-gray-500 bg-gray-900/30 rounded-xl border border-dashed border-gray-800">
						No sponsors added yet.
					</div>
				)}
			</div>

			<div className="border-t border-gray-700/50 pt-6">
				<h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
					Add Sponsor
				</h4>
				<form onSubmit={handleAdd} className="flex flex-col gap-4">
					<div className="flex flex-col md:flex-row gap-4">
						<input
							type="text"
							placeholder="Sponsor Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="flex-1 px-4 py-2 rounded-xl glass-input focus:ring-1 focus:ring-primary/50"
							required
						/>
						<input
							type="url"
							placeholder="Website URL"
							value={website}
							onChange={(e) => setWebsite(e.target.value)}
							className="flex-1 px-4 py-2 rounded-xl glass-input focus:ring-1 focus:ring-primary/50"
						/>
					</div>
					<div className="flex items-center gap-4">
						<div className="flex-1">
							<label className="text-xs text-gray-500 mb-1 block">
								Logo Image
							</label>
							<input
								type="file"
								accept="image/*"
								onChange={(e) =>
									setLogo(e.target.files?.[0] || null)
								}
								className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
							/>
						</div>
						<button
							type="submit"
							disabled={loading}
							className="self-end px-6 py-2 bg-primary text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors disabled:opacity-50 text-sm">
							{loading ? "Adding..." : "Add Sponsor"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

// --- Tickets Manager ---
export const TicketsManager = ({
	eventId,
	tickets,
}: {
	eventId: string;
	tickets: any[];
}) => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const [type, setType] = useState("");
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(100);

	const handleAdd = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!type) return;
		setLoading(true);
		const data = { type, price, quantity_available: quantity };

		try {
			await dispatch(addEventTicket({ eventId, data })).unwrap();
			setType("");
			setPrice(0);
			setQuantity(100);
		} catch (err) {
			console.error(err);
			alert("Failed to add ticket type");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Remove this ticket type?")) return;
		await dispatch(deleteEventTicket({ eventId, ticketId: id }));
	};

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{tickets?.map((ticket) => (
					<div
						key={ticket.id}
						className="glass-card p-4 rounded-xl flex items-center justify-between border border-gray-700/50">
						<div className="flex items-center gap-4">
							<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
								<Ticket size={20} />
							</div>
							<div>
								<h4 className="font-bold text-white">
									{ticket.type}
								</h4>
								<p className="text-sm text-gray-400">
									{ticket.quantity_available} available
								</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<span className="font-bold text-primary text-lg">
								KES {ticket.price}
							</span>
							<button
								onClick={() => handleDelete(ticket.id)}
								className="p-2 text-gray-600 hover:text-red-400 transition-colors">
								<Trash2 size={18} />
							</button>
						</div>
					</div>
				))}
				{(!tickets || tickets.length === 0) && (
					<div className="col-span-full text-center py-8 text-gray-500 bg-gray-900/30 rounded-xl border border-dashed border-gray-800">
						No ticket types defined.
					</div>
				)}
			</div>

			<div className="border-t border-gray-700/50 pt-6">
				<h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
					Add Ticket Type
				</h4>
				<form
					onSubmit={handleAdd}
					className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
					<div className="md:col-span-2">
						<label className="text-xs text-gray-500 mb-1 block">
							Ticket Name
						</label>
						<input
							type="text"
							placeholder="e.g. Early Bird, VIP"
							value={type}
							onChange={(e) => setType(e.target.value)}
							className="w-full px-4 py-2 rounded-xl glass-input focus:ring-1 focus:ring-primary/50"
							required
						/>
					</div>
					<div>
						<label className="text-xs text-gray-500 mb-1 block">
							Price (KES)
						</label>
						<input
							type="number"
							min="0"
							value={price}
							onChange={(e) => setPrice(Number(e.target.value))}
							className="w-full px-4 py-2 rounded-xl glass-input focus:ring-1 focus:ring-primary/50"
						/>
					</div>
					<div>
						<label className="text-xs text-gray-500 mb-1 block">
							Quantity
						</label>
						<input
							type="number"
							min="1"
							value={quantity}
							onChange={(e) =>
								setQuantity(Number(e.target.value))
							}
							className="w-full px-4 py-2 rounded-xl glass-input focus:ring-1 focus:ring-primary/50"
						/>
					</div>
					<div className="md:col-span-4 flex justify-end">
						<button
							type="submit"
							disabled={loading}
							className="px-6 py-2 bg-primary text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors disabled:opacity-50 text-sm">
							{loading ? "Adding..." : "Add Ticket Type"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
