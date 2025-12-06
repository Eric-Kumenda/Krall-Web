'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1512238972088-8acb84db0771?w=1500&auto=format&fit=crop&q=80"
          alt="Mentoring"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-900/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
          Since 2015
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-montserrat text-white mb-6 leading-tight">
          The Krall <span className="text-primary">K'ommunity</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light">
          Fulfilling small dreams and big plans. A hub for creativity, mentorship, and community growth.
        </p>
      </div>
    </section>
  );
}
