import React from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import StarBorder from './StarBorder';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export default function TestimonialCard({ name, role, quote, avatar }: TestimonialCardProps) {
  return (
    <div className="h-full p-2">
      <StarBorder className="w-full h-full" color="#ffce1b" speed="4s">
        <div className="relative pt-10 pb-8 px-8 h-full bg-gray-900/90 rounded-[20px]">
          {/* Large Decorative Quote Icon */}
          <div className="absolute top-4 right-6 text-primary/10">
            <Quote size={60} className="transform rotate-180" />
          </div>

          <div className="flex flex-col h-full items-center text-center">
            {/* Hexagon Avatar with Flag */}
            <div className="relative w-24 h-24 mb-6">
              {/* Hexagon Clip Path */}
              <div 
                className="w-full h-full relative z-10"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: '#ffce1b', // Primary color border effect
                  padding: '2px'
                }}
              >
                <div 
                  className="w-full h-full bg-gray-900 relative"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                >
                  <Image 
                    src={avatar} 
                    alt={name} 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* Kenyan Flag Badge - Positioned relative to the hexagon */}
              <div 
                className="absolute bottom-0 right-1 w-8 h-8 rounded-full border-2 border-gray-900 overflow-hidden shadow-lg z-20"
                title="Kenya"
              >
                <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
                  <g fillRule="evenodd" strokeWidth="1pt">
                    <path fill="#000000" d="M0 0h640v480H0z"/>
                    <path fill="#922529" d="M0 125h640v230H0z"/>
                    <path fill="#008C51" d="M0 360h640v120H0z"/>
                    <path fill="#FFFFFF" d="M0 125h640v25H0zM0 335h640v25H0z"/>
                    <g transform="matrix(.65 0 0 .65 320 240)">
                      <path fill="#B22234" d="M-50-140c20 60 20 220 0 280h100c-20-60-20-220 0-280z"/>
                      <path fill="#000000" d="M-50-140c20 60 20 220 0 280-30 0-45-20-45-140s15-140 45-140zM50 140c-20-60-20-220 0-280 30 0 45 20 45 140s-15 140-45 140z"/>
                      <path fill="#FFFFFF" d="M-15-100c5 40 5 160 0 200h30c-5-40-5-160 0-200z"/>
                      <path fill="#FFFFFF" d="M0-110l15 30h-30zM0 110l15-30h-30z"/>
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="flex-grow mb-6">
              <p className="font-playfair text-base text-gray-300 italic leading-relaxed">
                "{quote}"
              </p>
            </blockquote>

            {/* Author Info */}
            <div className="border-t border-gray-800 pt-4 w-full">
              <h4 className="font-montserrat font-bold text-white text-base">
                {name}
              </h4>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mt-1">
                {role}
              </p>
            </div>
          </div>
        </div>
      </StarBorder>
    </div>
  );
}
