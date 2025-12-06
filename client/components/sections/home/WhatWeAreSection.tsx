
import React from 'react';
import SectionHeader from '../../SectionHeader';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function WhatWeAreSection() {
  return (
    <section className="py-10 md:py-16 bg-gray-900 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-20 -skew-x-12 transform translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Column */}
          <div className="w-full lg:w-1/2 relative group lg:flex lg:justify-end ">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] lg:max-w-[400px]">
              <Image
                className="w-full h-auto max-h-[400px] lg:max-h-[700px] object-cover"
                src="https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?q=80&w=800&auto=format&fit=crop"
                width={800}
                height={600}
                alt="What We Are"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 max-w-[200px] hidden md:block">
              <p className="text-primary font-bold text-4xl mb-1">10+</p>
              <p className="text-gray-300 text-sm font-medium">Years of creating amazing experiences</p>
            </div>
          </div>
          
          {/* Content Column */}
          <div className="w-full lg:w-1/2">
            <div className="inline-block mb-4">
              <span className="text-primary font-bold tracking-wider uppercase text-sm border-b-2 border-primary pb-1">
                Who We Are
              </span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-6 leading-tight">
              We Create <span className="bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Unforgettable</span> Moments
            </h2>
            
            <h3 className="font-playfair italic text-lg text-gray-300 mb-6">
              "Always Amazing Experience"
            </h3>
            
            <div className="space-y-6 text-gray-400 text-base leading-relaxed">
              <p>
                At The Krall Konsult, we believe in the power of connection. We are more than just a service provider; 
                we are architects of experiences that bring people together, inspire creativity, and foster community growth.
              </p>
              <p>
                Whether it's through our curated events, our creative spaces, or our community programs, 
                our mission remains the same: to deliver excellence and create lasting impact in everything we do.
              </p>
            </div>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <Link 
                href="/about" 
                className="group inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-all transform hover:-translate-y-1 shadow-lg shadow-yellow-500/20"
              >
                Learn More
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 border border-gray-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-800 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
