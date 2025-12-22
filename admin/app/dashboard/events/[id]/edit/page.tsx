"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
	ArrowLeft,
	Save,
	Loader2,
	Upload,
	Calendar as CalendarIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchEventById, updateEvent } from "@/store/slices/eventsSlice";
import EventRelationTabs from "@/components/ui/EventRelationTabs";
import {
	SpeakersManager,
	SponsorsManager,
	TicketsManager,
} from "@/components/events/EventRelations";

// Helper component for dynamic list
const DynamicList = ({
	items,
	onChange,
}: {
	items: string[];
	onChange: (items: string[]) => void;
}) => {
	const add = () => onChange([...items, ""]);
	const remove = (index: number) =>
		onChange(items.filter((_, i) => i !== index));
	const update = (index: number, value: string) => {
		const newItems = [...items];
		newItems[index] = value;
		onChange(newItems);
	};

	return (
		<div className="space-y-2">
			{items.map((item, index) => (
				<div key={index} className="flex gap-2">
					<input
						type="text"
						value={item}
						onChange={(e) => update(index, e.target.value)}
						className="flex-1 px-4 py-2 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all text-sm"
						placeholder="e.g. Engaging sessions..."
					/>
					<button
						type="button"
						onClick={() => remove(index)}
						className="p-2 text-red-400 hover:text-red-300">
						<div className="w-5 h-5 border-2 border-red-400 rounded-full flex items-center justify-center">
							-
						</div>
					</button>
				</div>
			))}
			<button
				type="button"
				onClick={add}
				className="text-sm text-primary hover:text-primary/80 font-medium">
				+ Add Item
			</button>
		</div>
	);
};

export default function EditEventPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const [loading, setLoading] = useState(false);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const router = useRouter();
	const dispatch = useAppDispatch();

	const { items } = useAppSelector((state) => state.events);

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		date: "",
		location: "",
		price: 0,
		tickets_available: 100,
		is_published: false,
		image_url: "",
		category: "",
		venue: "",
		phone: "",
		email: "",
		what_to_expect: [] as string[],
	});

	useEffect(() => {
		dispatch(fetchEventById(id))
			.unwrap()
			.then((data) => {
				const date = new Date(data.date);
				const formattedDate = date.toISOString().slice(0, 16);

				setFormData({
					title: data.title,
					description: data.description || "",
					date: formattedDate,
					location: data.location,
					price: data.price,
					tickets_available: data.tickets_available,
					is_published: data.is_published,
					image_url: data.image_url,
					category: data.category || "",
					venue: data.venue || "",
					phone: data.phone || "",
					email: data.email || "",
					what_to_expect: data.what_to_expect || [],
				});
				setImagePreview(data.image_url);
			})
			.catch((err) => {
				console.error("Failed to fetch event:", err);
				alert("Failed to load event details");
				router.push("/dashboard/events");
			});
	}, [dispatch, id, router]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setImageFile(file);
			setImagePreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const data = new FormData();
			data.append("title", formData.title);
			data.append("description", formData.description);
			data.append("date", formData.date);
			data.append("location", formData.location);
			data.append("price", formData.price.toString());
			data.append(
				"tickets_available",
				formData.tickets_available.toString()
			);
			data.append("is_published", formData.is_published.toString());
			data.append("category", formData.category);
			data.append("venue", formData.venue);
			data.append("phone", formData.phone);
			data.append("email", formData.email);
			data.append(
				"what_to_expect",
				JSON.stringify(formData.what_to_expect)
			);

			if (formData.image_url) {
				data.append("image_url", formData.image_url);
			}

			if (imageFile) {
				data.append("image", imageFile);
			}

			await dispatch(updateEvent({ id, data })).unwrap();

			router.push(`/dashboard/events/${id}`);
		} catch (error) {
			console.error("Error updating event:", error);
			alert("Failed to update event");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="flex items-center gap-4 mb-8">
				<Link
					href={`/dashboard/events/${id}`}
					className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
					<ArrowLeft size={24} />
				</Link>
				<h1 className="text-3xl font-bold font-montserrat text-white">
					Edit Event
				</h1>
			</div>

			<form onSubmit={handleSubmit} className="space-y-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column - Main Info */}
					<div className="lg:col-span-2 space-y-6">
						<div className="glass-card p-6 rounded-2xl space-y-4">
							<h3 className="text-lg font-bold text-white mb-4">
								Basic Information
							</h3>
							<div>
								<label className="block text-sm font-medium text-gray-300 mb-2">
									Event Title
								</label>
								<input
									type="text"
									required
									value={formData.title}
									onChange={(e) =>
										setFormData({
											...formData,
											title: e.target.value,
										})
									}
									className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-300 mb-2">
									Description
								</label>
								<textarea
									rows={5}
									value={formData.description}
									onChange={(e) =>
										setFormData({
											...formData,
											description: e.target.value,
										})
									}
									className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Category
									</label>
									<select
										value={formData.category}
										onChange={(e) =>
											setFormData({
												...formData,
												category: e.target.value,
											})
										}
										className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all">
										<option value="">
											Select Category
										</option>
										<option value="Art">Art</option>
										<option value="Music">Music</option>
										<option value="Workshops">
											Workshops
										</option>
										<option value="Community">
											Community
										</option>
										<option value="Tech">Tech</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Venue Name
									</label>
									<input
										type="text"
										value={formData.venue}
										onChange={(e) =>
											setFormData({
												...formData,
												venue: e.target.value,
											})
										}
										className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
										placeholder="e.g. The Krall Arena"
									/>
								</div>
							</div>
						</div>

						<div className="glass-card p-6 rounded-2xl space-y-4">
							<h3 className="text-lg font-bold text-white mb-4">
								Date & Location
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Date & Time
									</label>
									<input
										type="datetime-local"
										required
										value={formData.date}
										onChange={(e) =>
											setFormData({
												...formData,
												date: e.target.value,
											})
										}
										className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Location Address
									</label>
									<input
										type="text"
										value={formData.location}
										onChange={(e) =>
											setFormData({
												...formData,
												location: e.target.value,
											})
										}
										className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
										placeholder="e.g. Nairobi West"
									/>
								</div>
							</div>
						</div>

						<div className="glass-card p-6 rounded-2xl space-y-4">
							<h3 className="text-lg font-bold text-white mb-4">
								Contact Info
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Phone
									</label>
									<input
										type="text"
										value={formData.phone}
										onChange={(e) =>
											setFormData({
												...formData,
												phone: e.target.value,
											})
										}
										className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Email
									</label>
									<input
										type="email"
										value={formData.email}
										onChange={(e) =>
											setFormData({
												...formData,
												email: e.target.value,
											})
										}
										className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary/50 transition-all"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - Settings & Image */}
					<div className="space-y-6">
						<div className="glass-card p-6 rounded-2xl space-y-4">
							<h3 className="text-lg font-bold text-white mb-4">
								Event Image
							</h3>
							<div className="relative aspect-video w-full bg-gray-800 rounded-xl overflow-hidden border-2 border-dashed border-gray-700 hover:border-primary transition-colors group">
								{imagePreview ? (
									<Image
										src={imagePreview}
										alt="Preview"
										fill
										className="object-cover"
										unoptimized={true}
									/>
								) : (
									<div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
										<Upload size={32} className="mb-2" />
										<span className="text-sm">
											Click to upload
										</span>
									</div>
								)}
								<input
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									className="absolute inset-0 opacity-0 cursor-pointer"
								/>
							</div>
						</div>

						<div className="glass-card p-6 rounded-2xl space-y-4">
							<h3 className="text-lg font-bold text-white mb-4">
								What to Expect
							</h3>
							<DynamicList
								items={formData.what_to_expect}
								onChange={(items) =>
									setFormData({
										...formData,
										what_to_expect: items,
									})
								}
							/>
						</div>

						<div className="glass-card p-6 rounded-2xl">
							<label className="flex items-center justify-between cursor-pointer">
								<span className="text-white font-medium">
									Publish Event
								</span>
								<div className="relative">
									<input
										type="checkbox"
										checked={formData.is_published}
										onChange={(e) =>
											setFormData({
												...formData,
												is_published: e.target.checked,
											})
										}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
								</div>
							</label>
						</div>
					</div>
				</div>

				<div className="flex justify-end pt-4">
					<button
						type="submit"
						disabled={loading}
						className="flex items-center gap-2 px-8 py-4 bg-primary hover:bg-yellow-400 text-black font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-primary/20">
						{loading ? (
							<Loader2 className="animate-spin" size={20} />
						) : (
							<Save size={20} />
						)}
						Save Changes
					</button>
				</div>
			</form>

			{/* Relations Management */}
			<div className="mt-12 pb-20">
				<h2 className="text-2xl font-bold font-montserrat text-white mb-6">
					Manage Event Details
				</h2>
				<div className="glass-card rounded-2xl overflow-hidden">
					<EventRelationTabs
						speakersContent={
							<SpeakersManager
								eventId={id}
								speakers={
									items.find((e) => e.id === id)?.speakers ||
									[]
								}
							/>
						}
						sponsorsContent={
							<SponsorsManager
								eventId={id}
								sponsors={
									items.find((e) => e.id === id)?.sponsors ||
									[]
								}
							/>
						}
						ticketsContent={
							<TicketsManager
								eventId={id}
								tickets={
									items.find((e) => e.id === id)?.tickets ||
									[]
								}
							/>
						}
					/>
				</div>
			</div>
		</div>
	);
}
