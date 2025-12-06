'use client';

import React from 'react';
import Image from 'next/image';

export default function StorySection() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary font-bold tracking-wider uppercase text-sm border-b-2 border-primary pb-1">
            Our Story
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-white mt-6 mb-8">
            From humble beginnings to a <span className="text-primary">Creative Hub</span>
          </h2>
          
          <div className="bg-gray-800/30 border border-gray-700 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              The Krall was initially established as a library which relocated from Ongata Rongai to a garage in Acacia Village Estate in 2020.
              <br /><br />
              After the COVID-19 pandemic, the establishment expanded into a social & creative hub and is currently nurturing young entrepreneurs within the community. We believe in the power of connection and the potential of every individual.
            </p>
            
            <div className="flex flex-col items-center justify-center mt-8 pt-8 border-t border-gray-700">
              <div className="relative w-16 h-16 mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1742119971773-57e0131095b0?w=500&auto=format&fit=crop&q=60"
                  alt="Moses Kibe Kihiko"
                  fill
                  className="object-cover rounded-full border-2 border-primary"
                />
              </div>
              <h4 className="text-white font-bold font-montserrat text-lg">Moses Kibe Kihiko</h4>
              <p className="text-primary text-sm uppercase tracking-wider font-bold">Director</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
