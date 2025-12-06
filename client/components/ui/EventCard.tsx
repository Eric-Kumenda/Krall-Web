'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanyardBadge from './LanyardBadge';

interface EventCardProps {
  day: string;
  month: string;
  dateFull: string;
  title: string;
  description: string;
  imageUrl: string;
  categoryIcon: React.ReactNode;
  categoryColor?: string;
}

export default function EventCard({ 
  day, 
  month, 
  dateFull, 
  title, 
  description, 
  imageUrl,
  categoryIcon,
  categoryColor
}: EventCardProps) {
  return (
    <div className="group relative flex flex-col lg:flex-row gap-6 bg-gray-900/50 border border-gray-800 rounded-3xl p-4 hover:bg-gray-800/50 transition-all duration-300 hover:border-primary/30 overflow-hidden">
      {/* Image Column */}
      <div className="relative w-full lg:w-72 h-48 lg:h-auto rounded-2xl overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent lg:hidden" />
        
        {/* Mobile Date Badge */}
        <div className="absolute top-4 right-4 lg:hidden bg-gray-900/90 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
          <span className="block text-xl font-bold text-primary">{day}</span>
          <span className="block text-xs uppercase tracking-wider text-white">{month}</span>
        </div>
      </div>

      {/* Lanyard Badge Column (Desktop) */}
      <div className="hidden lg:flex flex-col items-center justify-start pt-2 min-w-[80px]">
        <LanyardBadge icon={categoryIcon} color={categoryColor} />
      </div>

      {/* Content Column */}
      <div className="flex-grow flex flex-col justify-between py-2 pr-4">
        <div>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2 block">
                {dateFull}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                {title}
              </h3>
            </div>
            
            {/* Desktop Date */}
            <div className="hidden lg:block text-center px-4 border-l border-gray-700/50">
              <span className="block text-3xl font-bold text-white">{day}</span>
              <span className="block text-sm uppercase tracking-wider text-gray-400">{month}</span>
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-auto">
          <Link 
            href="/events" 
            className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-6 py-2.5 rounded-full hover:bg-yellow-400 transition-all text-sm shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:-translate-y-0.5"
          >
            Get Ticket
          </Link>
          <button className="text-gray-400 hover:text-white text-sm font-bold transition-colors px-4 py-2 rounded-full hover:bg-white/5">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
