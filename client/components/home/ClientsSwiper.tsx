"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ClientsSwiper: React.FC = () => {
	const clients = [
		"https://bootstrapmade.com/content/demo/Impact/assets/img/clients/client-1.png",
		"https://bootstrapmade.com/content/demo/Impact/assets/img/clients/client-2.png",
		"https://bootstrapmade.com/content/demo/Impact/assets/img/clients/client-3.png",
		"https://bootstrapmade.com/content/demo/Impact/assets/img/clients/client-4.png",
		"https://bootstrapmade.com/content/demo/Impact/assets/img/clients/client-5.png",
		"https://bootstrapmade.com/content/demo/Impact/assets/img/clients/client-6.png",
		"https://bootstrapmade.com/content/demo/Impact/assets/img/clients/client-7.png",
		"https://bootstrapmade.com/content/demo/Impact/assets/img/clients/client-8.png",
	];

	return (
		<section className="py-5">
			<Swiper
				spaceBetween={20}
				slidesPerView={4}
				loop={true}
				breakpoints={{
					0: { slidesPerView: 1 },
					576: { slidesPerView: 2 },
					768: { slidesPerView: 3 },
					992: { slidesPerView: 4 },
				}}>
				{clients.map((src, idx) => (
					<SwiperSlide key={idx}>
						<img
							className="img-fluid"
							src={src}
							alt={`Client ${idx + 1}`}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};
export default ClientsSwiper;
