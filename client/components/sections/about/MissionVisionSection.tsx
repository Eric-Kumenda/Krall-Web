'use client';

import React from 'react';
import Image from 'next/image';
import { Target, Lightbulb } from 'lucide-react';

export default function MissionVisionSection() {
  return (
    <section className="py-20 bg-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-900/50 skew-x-12 translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Column */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 group">
              <div className="aspect-square relative">
                <Image
                  src="https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?w=800&auto=format&fit=crop&q=80"
                  alt="Community Mission"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl max-w-xs">
                <p className="text-white font-playfair italic text-lg">
                  "Empowering youth through art, education, and community."
                </p>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-1/2 space-y-12">
            {/* Mission */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Target size={32} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-montserrat text-white mb-3">Our Mission</h3>
                <p className="text-gray-400 leading-relaxed">
                  By empowering youth through art, education, and community. We strive to create a safe space where young minds can explore their potential and turn their dreams into reality.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Lightbulb size={32} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-montserrat text-white mb-3">Our Vision</h3>
                <p className="text-gray-400 leading-relaxed">
                  We're a multidisciplinary space offering art, education and social activities like exhibitions, workshops and events. We envision a vibrant community where creativity knows no bounds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
