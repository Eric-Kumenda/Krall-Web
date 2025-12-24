"use client";

import React from "react";

export default function MapSection() {
	return (
		<section className="pb-20 bg-gray-900">
			<div className="container mx-auto px-4">
				<div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl shadow-black/50 grayscale hover:grayscale-0 transition-all duration-700">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d249.28852862932146!2d36.77449416406612!3d-1.4063691275106969!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske!4v1766587809791!5m2!1sen!2ske"
						width="100%"
						height="100%"
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					/>
				</div>

				<div className="text-center mt-16">
					<h2 className="text-2xl font-bold font-montserrat text-white mb-4">
						Looking for support?
					</h2>
					<p className="text-gray-400 mb-6">
						We might already have what you're looking for. See our
						FAQs or head to our dedicated Help Center.
					</p>
					<button className="px-8 py-3 rounded-full border border-gray-700 text-white font-bold hover:bg-white hover:text-gray-900 transition-all">
						Visit Help Center
					</button>
				</div>
			</div>
		</section>
	);
}
