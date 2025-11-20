import Image from "next/image";

export default function MissionVision() {
	return (
		<section className="container py-3">
			<div className="row pt-2 pt-sm-3 pt-md-4 pt-lg-5">
				<div
					className="col-md-5 col-lg-6 pb-1 pb-sm-2 pb-md-0 mb-4 mb-md-0"
					style={{ maxHeight: "300px" }}>
					<div
						className="ratio ratio-1x1 mx-auto"
						style={{ maxHeight: "300px", maxWidth: "300px" }}>
						<Image
							src="https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?w=500&auto=format&fit=crop&q=60"
							alt="Image"
							fill
							className="rounded-5 object-fit-cover"
						/>
					</div>
				</div>

				<div className="col-md-7 col-lg-6 d-flex flex-column justify-content-center pt-md-3 pt-xl-4 pt-xxl-5">
					<div className="ps-md-3 ps-lg-4 ps-xl-5 ms-xxl-4">
						<h2
							className="text-uppercase fw-normal text-center text-md-start text-primary fs-sm"
							style={{
								fontFamily: "Montserrat, sans-serif",
								letterSpacing: "1px",
							}}>
							Mission
						</h2>
						<p className="pb-xl-3">
							By empowering youth through art, education, and
							community.
						</p>
					</div>

					<div className="ps-md-3 ps-lg-4 ps-xl-5 ms-xxl-4">
						<h2
							className="text-uppercase fw-normal text-center text-md-start text-primary fs-sm"
							style={{
								fontFamily: "Montserrat, sans-serif",
								letterSpacing: "1px",
							}}>
							Vision
						</h2>
						<p className="pb-xl-3">
							We're a multidisciplinary space offering art,
							education and social activities like exhibitions
							workshops and events.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
