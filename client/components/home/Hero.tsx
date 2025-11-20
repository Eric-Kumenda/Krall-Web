"use client";

import React from "react";

const Hero: React.FC = () => {
	return (
		<div className="container-fluid position-relative px-md-0 pt-4 mt-5 mt-md-0 pt-md-0 mb-0 pb-0">
			{/* Video Background */}
			<div className="position-relative z-2">
				<video className="ratio w-100" muted loop autoPlay playsInline>
					<source
						src="https://eric-kumenda.github.io/Krall-Web/Docubox%20_%20Home.mp4"
						type="video/mp4"
					/>
				</video>

				{/* Dark overlay */}
				<div
					className="position-absolute start-0 top-0 w-100 h-100"
					style={{ backgroundColor: "#000", opacity: 0.3 }}></div>

				{/* Logo & CTA */}
				<div className="d-flex position-absolute start-0 top-0 w-100 h-100">
					{/* Mobile logo */}
					<div className="d-flex d-md-none align-self-start px-3 px-md-5 pt-md-5 h-auto user-select-none">
						<img
							src="/assets/img/Krall%20Logo%20-Light.svg"
							width={40}
							loading="eager"
							alt="Logo"
						/>
					</div>

					{/* Desktop logo */}
					<div className="d-none d-md-flex align-self-center mx-auto px-3 px-md-5 h-auto user-select-none">
						<img
							src="/assets/img/Krall%20Logo%20-Primary.svg"
							width={70}
							loading="eager"
							alt="Logo"
						/>
					</div>

					{/* CTA Text */}
					<div className="col-md-6 text-center text-md-start d-none d-md-flex justify-content-center align-items-center ms-auto justify-content-md-start align-items-md-center justify-content-xl-center py-3">
						<div style={{ maxWidth: "350px" }}>
							<h3 className="text-uppercase fw-bold text-white">
								THE KRALL KONSULT
							</h3>
							<a href="#" className="btn btn-dark me-2">
								Learn More
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile CTA Section */}
			<div className="row gy-4 gy-md-0 d-flex d-md-none z-2 position-relative">
				<div className="col-md-6 text-center text-md-start d-flex justify-content-center align-items-center py-3">
					<div style={{ maxWidth: "350px" }}>
						<h2 className="text-uppercase fw-bold text-white">
							WELCOME TO <br />
							THE KRALL KONSULT
						</h2>
						<p className="my-3 text-white">
							Tincidunt laoreet leo, adipiscing taciti tempor.
							Primis senectus sapien, risus donec ad fusce augue
							interdum.
						</p>
						<a href="#" className="btn btn-dark me-2">
							Learn More
						</a>
					</div>
				</div>
			</div>

			{/* Decorative overlays */}
			<div
				className="position-absolute top-0 start-0 w-100 h-100 d-none-dark"
				style={{
					background:
						"linear-gradient(90deg, #333126 0%, #372e2f 100%)",
				}}></div>
			<div
				className="d-none position-absolute top-0 start-0 w-100 h-100 d-block-dark"
				style={{
					background:
						"linear-gradient(119deg, #333126 0%, #372e2f 52.24%)",
					borderTopRightRadius: "48px",
					borderTopLeftRadius: "48px",
				}}></div>
		</div>
	);
};

export default Hero;
