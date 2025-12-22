"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchEventById, selectEventById } from "@/store/slices/eventsSlice";
import {
	selectCheckout,
	setStep,
	setEmail,
	setVerificationCode,
	sendVerificationCode,
	verifyCode,
	setAttendees,
	updateAttendeeName,
	initiatePayment,
	resetCheckout,
} from "@/store/slices/checkoutSlice";
import {
	Loader2,
	CheckCircle,
	Lock,
	User,
	CreditCard,
	Mail,
} from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
	const params = useParams();
	const searchParams = useSearchParams();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const id = params.id as string;
	// Parse tickets from URL query params
	useEffect(() => {
		if (id) {
			dispatch(fetchEventById(id));
		}
	}, [dispatch, id]);

	const event = useAppSelector((state) => selectEventById(state, id));
	const {
		step,
		email,
		verificationCode,
		isVerified,
		attendees,
		paymentStatus,
		paymentError,
	} = useAppSelector(selectCheckout);

	const [phoneNumber, setPhoneNumber] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (attendees.length === 0) {
			const ticketsParam = searchParams.get("tickets");
			if (ticketsParam) {
				try {
					const parsedTickets = JSON.parse(ticketsParam);
					// parsedTickets should be array of { type: string, quantity: number }
					const newAttendees: { ticketType: string; name: string }[] =
						[];
					parsedTickets.forEach(
						(t: { type: string; quantity: number }) => {
							for (let i = 0; i < t.quantity; i++) {
								newAttendees.push({
									ticketType: t.type,
									name: "",
								});
							}
						}
					);
					dispatch(setAttendees(newAttendees));
				} catch (e) {
					console.error("Failed to parse tickets", e);
				}
			}
		}
	}, [searchParams, dispatch, attendees.length]);

	const handleSendCode = async () => {
		setLoading(true);
		try {
			await dispatch(sendVerificationCode(email)).unwrap();
			alert("Verification code sent to your email!");
		} catch (error) {
			alert("Failed to send code. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleVerifyCode = async () => {
		setLoading(true);
		try {
			await dispatch(
				verifyCode({ email, code: verificationCode })
			).unwrap();
		} catch (error) {
			alert("Invalid code. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handlePayment = async () => {
		if (!event) return;

		// Calculate total amount
		const totalAmount = attendees.reduce((sum, attendee) => {
			const ticket = event.tickets.find(
				(t) => t.type === attendee.ticketType
			);
			return sum + (ticket ? ticket.price : 0);
		}, 0);

		try {
			await dispatch(
				initiatePayment({
					phoneNumber,
					amount: totalAmount,
					eventId: event.id,
					email,
					attendees,
				})
			).unwrap();
		} catch (error) {
			// Error handled in slice
		}
	};

	if (!event)
		return (
			<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
				Event not found
			</div>
		);

	return (
		<div className="min-h-screen bg-gray-900 pt-24 pb-20">
			<div className="container mx-auto px-4 max-w-3xl">
				{/* Header */}
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold text-white font-montserrat mb-2">
						Checkout
					</h1>
					<p className="text-gray-400">{event.title}</p>
				</div>

				{/* Steps Indicator */}
				<div className="flex items-center justify-center mb-12">
					{["email", "details", "payment", "success"].map(
						(s, index) => {
							const isActive = step === s;
							const isCompleted =
								[
									"email",
									"details",
									"payment",
									"success",
								].indexOf(step) > index;

							return (
								<div key={s} className="flex items-center">
									<div
										className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                  ${
						isActive
							? "bg-primary text-black"
							: isCompleted
							? "bg-green-500 text-black"
							: "bg-gray-800 text-gray-500"
					}
                `}>
										{isCompleted ? (
											<CheckCircle size={20} />
										) : (
											index + 1
										)}
									</div>
									{index < 3 && (
										<div
											className={`w-16 h-1 bg-gray-800 mx-2 ${
												isCompleted
													? "bg-green-500"
													: ""
											}`}
										/>
									)}
								</div>
							);
						}
					)}
				</div>

				{/* Content */}
				<div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
					{/* Step 1: Email Verification */}
					{step === "email" && (
						<div className="space-y-6">
							<h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
								<Mail className="text-primary" /> Verify Your
								Email
							</h2>

							<div>
								<label className="block text-sm font-medium text-gray-400 mb-2">
									Email Address
								</label>
								<div className="flex gap-2">
									<input
										type="email"
										value={email}
										onChange={(e) =>
											dispatch(setEmail(e.target.value))
										}
										className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
										placeholder="Enter your email"
										required
									/>
									<button
										onClick={handleSendCode}
										disabled={loading || !email}
										className="bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 disabled:opacity-50 font-bold transition-colors">
										{loading ? (
											<Loader2 className="animate-spin" />
										) : (
											"Send Code"
										)}
									</button>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-400 mb-2">
									Verification Code
								</label>
								<input
									type="text"
									value={verificationCode}
									onChange={(e) =>
										dispatch(
											setVerificationCode(e.target.value)
										)
									}
									className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
									placeholder="Enter 6-digit code"
								/>
							</div>

							<button
								onClick={handleVerifyCode}
								disabled={loading || !verificationCode}
								className="w-full bg-primary text-black font-bold py-4 rounded-lg hover:bg-primary/90 transition-colors mt-4">
								{loading ? (
									<Loader2 className="animate-spin mx-auto" />
								) : (
									"Verify & Continue"
								)}
							</button>
						</div>
					)}

					{/* Step 2: Attendee Details */}
					{step === "details" && (
						<div className="space-y-6">
							<h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
								<User className="text-primary" /> Attendee
								Details
							</h2>

							<div className="space-y-4">
								{attendees.map((attendee, index) => (
									<div
										key={index}
										className="bg-black/30 p-4 rounded-xl border border-white/5">
										<div className="flex justify-between mb-2">
											<span className="text-primary font-bold text-sm uppercase">
												{attendee.ticketType} Ticket
											</span>
											<span className="text-gray-500 text-xs">
												Attendee #{index + 1}
											</span>
										</div>
										<label className="block text-sm font-medium text-gray-400 mb-2">
											Full Name
										</label>
										<input
											type="text"
											value={attendee.name}
											onChange={(e) =>
												dispatch(
													updateAttendeeName({
														index,
														name: e.target.value,
													})
												)
											}
											className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
											placeholder="Enter attendee name"
										/>
									</div>
								))}
							</div>

							<button
								onClick={() => dispatch(setStep("payment"))}
								disabled={attendees.some((a) => !a.name)}
								className="w-full bg-primary text-black font-bold py-4 rounded-lg hover:bg-primary/90 transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
								Continue to Payment
							</button>
						</div>
					)}

					{/* Step 3: Payment */}
					{step === "payment" && (
						<div className="space-y-6">
							<h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
								<CreditCard className="text-primary" /> Payment
							</h2>

							<div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl mb-6">
								<div className="flex justify-between items-center">
									<span className="text-gray-300">
										Total Amount
									</span>
									<span className="text-2xl font-bold text-green-400">
										KES{" "}
										{attendees
											.reduce(
												(sum, a) =>
													sum +
													(event.tickets.find(
														(t) =>
															t.type ===
															a.ticketType
													)?.price || 0),
												0
											)
											.toLocaleString()}
									</span>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-400 mb-2">
									M-Pesa Phone Number
								</label>
								<input
									type="tel"
									value={phoneNumber}
									onChange={(e) =>
										setPhoneNumber(
											e.target.value.replace(/\s+/g, "")
										)
									}
									className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
									placeholder="2547..."
								/>
								<p className="text-xs text-gray-500 mt-2">
									Enter phone number in format 2547XXXXXXXX
								</p>
							</div>

							{paymentError && (
								<div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-sm">
									{paymentError}
								</div>
							)}

							<button
								onClick={handlePayment}
								disabled={
									paymentStatus === "loading" || !phoneNumber
								}
								className="w-full bg-green-600 text-white font-bold py-4 rounded-lg hover:bg-green-700 transition-colors mt-4 flex items-center justify-center gap-2">
								{paymentStatus === "loading" ? (
									<Loader2 className="animate-spin" />
								) : (
									"Pay with M-Pesa"
								)}
							</button>
						</div>
					)}

					{/* Step 4: Success */}
					{step === "success" && (
						<div className="text-center py-8">
							<div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
								<CheckCircle
									size={40}
									className="text-green-500"
								/>
							</div>
							<h2 className="text-3xl font-bold text-white mb-4">
								Payment Initiated!
							</h2>
							<p className="text-gray-400 mb-8 max-w-md mx-auto">
								Please check your phone to complete the M-Pesa
								transaction. Once confirmed, your tickets will
								be sent to <strong>{email}</strong>.
							</p>

							<button
								onClick={() => router.push("/")}
								className="bg-white/10 text-white px-8 py-3 rounded-full hover:bg-white/20 font-bold transition-colors">
								Return Home
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
