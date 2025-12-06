'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function ClientLogosSection() {
  const logos = [
    'https://bootstrapmade.com/content/demo/Impact/assets/img/clients/client-1.png',
    'https://bootstrapmade.com/content/demo/Impact/assets/img/clients/client-2.png',
    'https://bootstrapmade.com/content/demo/Impact/assets/img/clients/client-3.png',
    'https://bootstrapmade.com/content/demo/Impact/assets/img/clients/client-4.png',
    'https://bootstrapmade.com/content/demo/Impact/assets/img/clients/client-5.png',
    'https://bootstrapmade.com/content/demo/Impact/assets/img/clients/client-6.png',
    'https://bootstrapmade.com/content/demo/Impact/assets/img/clients/client-7.png',
    'https://bootstrapmade.com/content/demo/Impact/assets/img/clients/client-8.png'
  ];

  return (
    <section className="py-5">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        speed={600}
        autoplay={{
          delay: 5000,
        }}
        slidesPerView={2}
        spaceBetween={40}
        breakpoints={{
          480: {
            slidesPerView: 3,
            spaceBetween: 60,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 80,
          },
          992: {
            slidesPerView: 6,
            spaceBetween: 120,
          },
        }}
      >
        {logos.map((logo, index) => (
          <SwiperSlide key={index}>
            <Image 
              className="w-full h-auto" 
              src={logo} 
              alt={`Client ${index + 1}`}
              width={150}
              height={80}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
