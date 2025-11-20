"use client";

import React from "react";

const CallToSupport: React.FC = () => {
	return (
		<section className="py-3 py-xl-4">
			<div
				className="container p-0 rounded position-relative overflow-hidden"
				style={{ clipPath: "inset(0 round 15px)" }}>
				{/* Background image */}
				<div
					className="position-fixed top-0 start-0 w-100 h-100 overflow-hidden"
					style={{
						backgroundImage:
							"url(https://bootstrapmade.com/content/demo/Impact/assets/img/cta-bg.jpg)",
						zIndex: -20,
						objectFit: "cover",
					}}></div>

				{/* Text overlay */}
				<div
					className="text-center p-4 p-lg-5 m-0"
					style={{ background: "rgba(0,0,0,0.4)" }}>
					<h2
						className="fw-bold text-primary mb-2 mt-4 mt-md-5"
						style={{ fontFamily: "Montserrat, sans-serif" }}>
						Call To Support Impact Project
					</h2>
					<p className="text-light mb-4 fs-sm px-3">
						Duis aute irure dolor in reprehenderit in voluptate
						velit esse cillum dolore eu fugiat nulla pariatur.
						Excepteur sint occaecat cupidatat non proident, sunt in.
					</p>
					<button className="btn btn-primary btn-sm me-2 py-2 px-4 mb-4 mb-md-5">
						Get Involved
					</button>
					<button className="btn btn-outline-light btn-sm py-2 px-4 mb-4 mb-md-5">
						Learn More
					</button>
				</div>
			</div>
		</section>
	);
};
export default CallToSupport;
