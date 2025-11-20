"use client";

import React from "react";

const OurImpact: React.FC = () => {
	return (
		<section className="bg-primary-subtle py-3 position-relative">
			<div className="container z-2 position-relative">
				{/* Header Row */}
				<div className="row py-2">
					<div className="col-12 col-md-5 p-2">
						<h3
							className="ms-md-4 mt-md-4"
							style={{ fontFamily: "Montserrat, sans-serif" }}>
							Our Impact
						</h3>
						<hr className="ms-md-5 border-primary text-primary border-3 opacity-100 my-1" />
					</div>
					<div className="col-12 col-md-7">
						<p className="py-3">
							Use this space to describe the impact your
							organization or company has made. Sed dictum ante a
							leo cursus mattis. Integer euismod, lorem sed
							molestie gravida, justo mauris dignissim orci, sed
							convallis elit ipsum at justo. Donec feugiat justo
							vitae mollis pretium.
						</p>
						<a className="btn btn-dark" href="#">
							Learn More
						</a>
					</div>
				</div>

				{/* Stats Row */}
				<div className="row py-3">
					<div className="col-sm-12 col-md-4 border-end animate-underline border-bottom">
						<h1 className="py-3 ps-3 text-center text-md-start">
							600+
						</h1>
						<h6 className="text-danger mx-auto animate-target text-center text-md-start">
							LEADERS MENTORED
						</h6>
						<p>
							Donec feugiat justo vitae mollis pretium.
							Suspendisse ultrices, tellus vitae varius convallis,
							ipsum justo commodo dui.
						</p>
					</div>
					<div className="col-sm-12 col-md-4 mt-md-3 pt-md-3 border-end animate-underline border-bottom">
						<h1 className="py-3 ps-3 text-center text-md-start">
							2
						</h1>
						<h6 className="text-danger mx-auto animate-target text-center text-md-start">
							YEARS OF SERVICE
						</h6>
						<p>
							Donec feugiat justo vitae mollis pretium.
							Suspendisse ultrices, tellus vitae varius convallis,
							ipsum justo commodo dui.
						</p>
					</div>
					<div className="col-sm-12 col-md-4 mt-md-5 pt-md-3 animate-underline">
						<h1 className="py-3 ps-3 text-center text-md-start">
							600+
						</h1>
						<h6 className="text-danger mx-auto animate-target text-center text-md-start">
							LEADERS MENTORED
						</h6>
						<p>
							Donec feugiat justo vitae mollis pretium.
							Suspendisse ultrices, tellus vitae varius convallis,
							ipsum justo commodo dui.
						</p>
					</div>
				</div>
			</div>

			{/* Background overlay */}
			<div
				className="position-absolute top-0 start-0 w-100 h-100 d-none-dark"
				style={{
					background:
						"linear-gradient(270deg, #333126 0%, #372e2f 100%)",
				}}></div>
		</section>
	);
};

export default OurImpact;
