'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
    <div className="group relative flex flex-col md:flex-row gap-6 bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300 hover:border-primary/30">
      {/* Lanyard Badge Column */}
      <div className="hidden md:flex flex-col items-center justify-start pt-2 min-w-[100px]">
        <LanyardBadge icon={categoryIcon} color={categoryColor} />
      </div>

      {/* Date Column (Mobile) */}
      <div className="md:hidden flex items-center gap-4 mb-2">
        <div className="bg-gray-700/50 rounded-lg p-3 text-center min-w-[70px]">
          <span className="block text-2xl font-bold text-primary">{day}</span>
          <span className="block text-xs uppercase tracking-wider text-gray-400">{month}</span>
        </div>
        <div className="p-2 bg-gray-700/30 rounded-full">
            {categoryIcon}
        </div>
      </div>

      {/* Content Column */}
      <div className="flex-grow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-primary text-xs font-bold uppercase tracking-wider mb-1 block">
              {dateFull}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
          
          {/* Date Column (Desktop) */}
          <div className="hidden md:block text-center px-4 border-l border-gray-700">
            <span className="block text-3xl font-bold text-white">{day}</span>
            <span className="block text-sm uppercase tracking-wider text-gray-400">{month}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-2xl">
          {description}
        </p>

        <div className="flex items-center gap-4">
          <Link 
            href="/events" 
            className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-6 py-2 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-all text-sm"
          >
            Register Now
          </Link>
          <button className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
