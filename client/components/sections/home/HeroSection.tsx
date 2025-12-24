"use client";

import React from "react";
import Image from "next/image";

export default function HeroSection() {
	return (
		<div className="relative px-0 mt-0 mb-0 py-0 max-h-[70vh]">
			{/* Video Background Container */}
			<div className="relative z-10">
				<video
					className="w-full aspect-video md:aspect-auto object-cover"
					muted
					loop
					autoPlay
					playsInline>
					<source
						src="https://eric-kumenda.github.io/Krall-Web/Docubox%20_%20Home.mp4"
						type="video/mp4"
					/>
				</video>

				{/* Dark Overlay */}
				<div className="absolute top-0 left-0 w-full h-full bg-black opacity-30" />

				{/* Content Overlay */}
				<div className="absolute top-0 left-0 w-full h-full flex">
					{/* Mobile Logo (top left) */}
					<div className="flex md:hidden self-start px-3 md:px-5 pt-3 md:pt-5 h-auto select-none">
						<Image
							src="/assets/img/krall_logo__primary.svg"
							width={40}
							height={40}
							alt="Krall Logo"
							loading="eager"
						/>
					</div>

					{/* Desktop Logo (centered) */}
					<div className="hidden md:flex self-center mx-auto px-3 md:px-5 h-auto select-none">
						<Image
							src="/assets/img/krall_logo__primary.svg"
							width={70}
							height={70}
							alt="Krall Logo"
							loading="eager"
						/>
					</div>

					{/* Desktop CTA */}
					<div className="hidden md:flex col-span-6 text-center md:text-start justify-center items-center mx-auto md:justify-start md:items-center xl:justify-center py-3">
						<div className="max-w-[350px]">
							<h3 className="uppercase font-bold text-white text-2xl">
								THE KRALL KONSULT
							</h3>
							<a
								href="#"
								className="inline-block mt-3 px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors rounded-md"
								role="button">
								Learn More
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile CTA (below video) */}
			<div className="flex md:hidden z-10 relative">
				<div className="col-12 text-center md:text-start flex justify-center items-center md:justify-start md:items-center xl:justify-center py-3 w-full">
					<div className="max-w-[350px]">
						<h2 className="uppercase font-bold text-white">
							WELCOME TO
							<br />
							THE KRALL KONSULT
						</h2>
						<p className="my-3 text-gray-300">
							Tincidunt laoreet leo, adipiscing taciti tempor.
							Primis senectus sapien, risus donec ad fusce augue
							interdum.
						</p>
						<a
							href="#"
							className="inline-block px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors"
							role="button">
							Learn More
						</a>
					</div>
				</div>
			</div>

			{/* Background Gradients */}
			<div
				className="absolute top-0 left-0 w-full h-full -z-10"
				style={{
					background:
						"linear-gradient(90deg, #333126 0%, #372e2f 100%)",
				}}
			/>
		</div>
	);
}
