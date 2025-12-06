'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ServiceImageCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

export default function ServiceImageCard({ title, description, imageUrl, link = '#' }: ServiceImageCardProps) {
  return (
    <div className="group relative h-full bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden hover:border-primary/50 transition-colors duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gray-900 rounded-tl-3xl z-10">
          <div className="absolute bottom-0 right-0 w-full h-full bg-gray-900" />
          {/* Corner Curve Fix */}
          <div className="absolute top-0 left-0 w-6 h-6 bg-transparent shadow-[6px_6px_0_0_#111827] rounded-br-xl" />
        </div>
        
        <div className="absolute bottom-4 right-4 z-20 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white group-hover:bg-primary group-hover:text-gray-900 transition-all duration-300 group-hover:rotate-[-45deg]">
          <ArrowRight size={20} />
        </div>
      </div>

      {/* Content */}
      <div className="p-8 pt-4 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold font-montserrat text-white mb-4 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
          {description}
        </p>
        
        <Link 
          href={link}
          className="inline-flex items-center text-sm font-bold text-primary hover:text-white transition-colors mt-auto"
        >
          Learn More <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
