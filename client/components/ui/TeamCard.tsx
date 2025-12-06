'use client';

import React from 'react';
import Image from 'next/image';
import { Linkedin, Instagram, Twitter } from 'lucide-react';

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  socials?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
}

export default function TeamCard({ name, role, image, bio, socials }: TeamCardProps) {
  return (
    <div className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer">
      {/* Background Image */}
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <div className="border-l-4 border-primary pl-4 mb-4">
          <h3 className="text-2xl font-bold font-montserrat text-white">{name}</h3>
          <p className="text-primary font-bold text-sm uppercase tracking-wider">{role}</p>
        </div>
        
        <div className="overflow-hidden max-h-0 group-hover:max-h-48 transition-all duration-500 ease-in-out">
          <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
            {bio}
          </p>
          
          <div className="flex gap-4 pt-2 border-t border-gray-700/50">
            {socials?.linkedin && (
              <a href={socials.linkedin} className="text-white hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            )}
            {socials?.instagram && (
              <a href={socials.instagram} className="text-white hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            )}
            {socials?.twitter && (
              <a href={socials.twitter} className="text-white hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
