'use client';

import React from 'react';
import Image from 'next/image';

export default function ShopHero() {
  return (
    <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1500&auto=format&fit=crop&q=80"
          alt="Shop Merchandise"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-900/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
          Official Merchandise
        </span>
        <h1 className="text-4xl md:text-6xl font-bold font-montserrat text-white mb-6">
          Wear The <span className="text-primary">Krall</span>
        </h1>
        <p className="text-lg text-gray-200 max-w-xl mx-auto leading-relaxed font-light">
          Exclusive collection of high-quality apparel and accessories. Represent The Krall community in style.
        </p>
      </div>
    </section>
  );
}
