"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Mail,
	ArrowRight,
	MapPin,
	Phone,
} from "lucide-react";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-950 text-white pt-20 pb-10 border-t border-gray-800">
			<div className="container mx-auto px-4">
				{/* Top CTA Section */}
				<div className="flex flex-col md:flex-row items-center justify-between bg-gray-900 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden group">
					<div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

					<div className="relative z-10 mb-8 md:mb-0 text-center md:text-left">
						<h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
							Ready to <span className="text-primary">Lorem</span>{" "}
							Ipsum dolor?
						</h2>
						<p className="text-gray-400 max-w-xl">
							Join forces with Krall Konsult and let's create
							something extraordinary together. Your vision, our
							expertise.
						</p>
					</div>

					<Link
						href="/contact"
						className="relative z-10 inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-full hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg shadow-primary/20">
						Let's Work Together
						<ArrowRight className="w-5 h-5" />
					</Link>
				</div>

				{/* Main Footer Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
					{/* Brand Column */}
					<div className="space-y-6">
						<Link href="/" className="flex items-center gap-2">
							<div className="relative w-10 h-10">
								<Image
									src="/assets/img/krall_logo__primary.svg"
									alt="Krall Logo"
									width={40}
									height={40}
									className="object-contain"
								/>
							</div>
							<span className="font-montserrat font-bold text-xl tracking-wider">
								KRALL{" "}
								<span className="text-primary">KONSULT</span>
							</span>
						</Link>
						<p className="text-gray-400 text-sm leading-relaxed">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Fusce vitae arcu.
						</p>
						<div className="flex gap-4">
							{[Facebook, Twitter, Instagram, Linkedin].map(
								(Icon, index) => (
									<a
										key={index}
										href="#"
										className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-gray-900 transition-all duration-300">
										<Icon size={18} />
									</a>
								)
							)}
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="font-montserrat font-bold text-lg mb-6">
							Quick Links
						</h3>
						<ul className="space-y-4">
							{[
								"Home",
								"About Us",
								"Services",
								"Events",
								"Contact",
							].map((item) => (
								<li key={item}>
									<Link
										href={`/${item
											.toLowerCase()
											.replace(" ", "-")}`}
										className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
										<span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Services */}
					<div>
						<h3 className="font-montserrat font-bold text-lg mb-6">
							Our Services
						</h3>
						<ul className="space-y-4">
							{["Lorem", "Ipsum", "Dolor", "Sit", "Amet"].map(
								(item) => (
									<li key={item}>
										<Link
											href="/services"
											className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
											<span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
											{item}
										</Link>
									</li>
								)
							)}
						</ul>
					</div>

					{/* Newsletter */}
					<div>
						<h3 className="font-montserrat font-bold text-lg mb-6">
							Newsletter
						</h3>
						<p className="text-gray-400 text-sm mb-6">
							Subscribe to our newsletter to get the latest
							updates and news.
						</p>
						<form
							className="space-y-4"
							onSubmit={(e) => e.preventDefault()}>
							<div className="relative">
								<input
									type="email"
									placeholder="Your email address"
									className="w-full bg-gray-900 border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors"
								/>
								<Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
							</div>
							<button
								type="submit"
								className="w-full bg-white text-gray-900 font-bold py-3 rounded-lg hover:bg-primary transition-colors">
								Subscribe
							</button>
						</form>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-gray-500 text-sm text-center md:text-left">
						© {currentYear} Krall Konsult. All rights reserved.
					</p>
					<div className="flex gap-6 text-sm text-gray-500">
						<Link
							href="#"
							className="hover:text-primary transition-colors">
							Privacy Policy
						</Link>
						<Link
							href="#"
							className="hover:text-primary transition-colors">
							Terms of Service
						</Link>
						<Link
							href="#"
							className="hidden hover:text-primary transition-colors">
							Cookie Policy
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
