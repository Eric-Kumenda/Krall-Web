'use client';

import React from 'react';
import Image from 'next/image';

export default function EventsHero() {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1500&auto=format&fit=crop&q=80"
          alt="Events Crowd"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-900/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold font-montserrat text-white mb-6">
          Upcoming <span className="text-primary">Events</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light">
          Join us for workshops, exhibitions, and community gatherings. There's always something happening at The Krall.
        </p>
      </div>
    </section>
  );
}
