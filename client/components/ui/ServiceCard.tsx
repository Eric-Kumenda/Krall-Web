import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import TiltedCard from './TiltedCard';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

export default function ServiceCard({ icon, title, description, link }: ServiceCardProps) {
  return (
    <Link href={link} className="block h-full">
      <TiltedCard 
        className="h-full p-8 rounded-2xl bg-gray-800/50 border border-gray-700 overflow-hidden group"
        maxRotation={10}
        scale={1.02}
        glareOpacity={0.3}
      >
        {/* Hover Gradient Background (Subtle underlying glow) */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col h-full pointer-events-none">
          <div className="mb-6 inline-flex p-3 rounded-xl bg-gray-900/50 text-primary group-hover:bg-primary group-hover:text-gray-900 transition-colors duration-300 w-fit">
            {icon}
          </div>
          
          <h3 className="text-xl font-bold font-montserrat text-white mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
            {description}
          </p>
          
          <div className="flex items-center text-sm font-bold text-primary opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Read More
            <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </div>
      </TiltedCard>
    </Link>
  );
}
