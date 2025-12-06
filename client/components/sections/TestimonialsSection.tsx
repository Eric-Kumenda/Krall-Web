'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import TestimonialCard from '../ui/TestimonialCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Tony Knox',
      role: 'Film Maker',
      quote: 'The Krall Konsult has been instrumental in helping me connect with other creatives. The environment is inspiring and the events are top-notch.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60'
    },
    {
      name: 'Sarah Jenkins',
      role: 'Community Builder',
      quote: 'I found a home here. The mentorship program gave me the guidance I needed to launch my own initiative. Truly grateful for this community.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60'
    },
    {
      name: 'Michael Chen',
      role: 'Entrepreneur',
      quote: 'The networking opportunities are unmatched. I\'ve met partners, clients, and friends who share my passion for making a difference.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60'
    },
    {
      name: 'Amara Okafor',
      role: 'Artist',
      quote: 'A space that truly values art and culture. The exhibitions and workshops have helped me grow as an artist and reach a wider audience.',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&auto=format&fit=crop&q=60'
    }
  ];

  return (
    <section className="relative py-20 bg-gray-900 overflow-hidden">
      {/* Artistic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-[80px]" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-600 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-xl">
            <span className="text-primary font-bold tracking-wider uppercase text-sm border-b-2 border-primary pb-1">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-white mt-6">
              Stories from Our <span className="text-primary font-playfair italic">Community</span>
            </h2>
          </div>
          
          <div className="flex gap-4 mt-6 md:mt-0">
            <button 
              className="prev-testimonial p-3 rounded-full border border-gray-600 text-white hover:bg-primary hover:text-yellow-500 hover:border-primary transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              className="next-testimonial p-3 rounded-full border border-gray-600 text-white hover:bg-primary hover:text-yellow-500 hover:border-primary transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          loop={false}
          speed={800}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          spaceBetween={30}
          navigation={{
            prevEl: '.prev-testimonial',
            nextEl: '.next-testimonial',
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          className="pb-12 !overflow-visible"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="h-auto cursor-pointer">
              <TestimonialCard {...testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="text-center mt-8">
           <Link href="#" className="inline-flex items-center text-gray-400 hover:text-primary transition-colors group">
            <span className="text-sm mr-2">View More Stories on Instagram</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
