'use client';
import React from 'react';

interface StarBorderProps {
  as?: React.ElementType;
  className?: string;
  color?: string;
  speed?: string;
  children: React.ReactNode;
}

export default function StarBorder({
  as: Component = 'div',
  className = '',
  color = '#ffce1b',
  speed = '6s',
  children,
}: StarBorderProps) {
  return (
    <Component className={`relative inline-block py-[1px] overflow-hidden rounded-[20px] ${className}`}>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="relative z-1 bg-gray-900 border border-gray-800 text-white rounded-[20px] h-full">
        {children}
      </div>
      
      <style jsx>{`
        @keyframes star-movement-bottom {
          0% { transform: translate(0%, 0%); opacity: 1; }
          50% { opacity: 0; transform: translate(-100%, 0%); }
          100% { opacity: 0; transform: translate(-100%, 0%); }
        }
        @keyframes star-movement-top {
          0% { opacity: 0; transform: translate(0%, 0%); }
          50% { opacity: 0; transform: translate(100%, 0%); }
          100% { opacity: 1; transform: translate(100%, 0%); }
        }
      `}</style>
    </Component>
  );
}
