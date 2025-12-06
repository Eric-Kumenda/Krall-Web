'use client';
import React from 'react';

interface LanyardBadgeProps {
  icon: React.ReactNode;
  color?: string;
  className?: string;
}

export default function LanyardBadge({ icon, color = '#ffce1b', className = '' }: LanyardBadgeProps) {
  return (
    <div className={`relative group ${className}`} style={{ width: '80px', height: '120px' }}>
      {/* The String/Cord */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gray-600 origin-top group-hover:animate-swing z-0">
        {/* The Clip */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-gray-400 rounded-sm" />
      </div>

      {/* The Badge */}
      <div 
        className="absolute top-14 left-1/2 -translate-x-1/2 w-16 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center border-t-4 origin-top group-hover:animate-swing-badge z-10"
        style={{ borderColor: color }}
      >
        {/* Hole for clip */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-200 rounded-full" />
        
        <div className="text-gray-800">
          {icon}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes swing {
          0% { transform: translateX(-50%) rotate(0deg); }
          25% { transform: translateX(-50%) rotate(5deg); }
          50% { transform: translateX(-50%) rotate(-3deg); }
          75% { transform: translateX(-50%) rotate(1deg); }
          100% { transform: translateX(-50%) rotate(0deg); }
        }
        @keyframes swing-badge {
          0% { transform: translateX(-50%) rotate(0deg); }
          25% { transform: translateX(-50%) rotate(5deg); }
          50% { transform: translateX(-50%) rotate(-3deg); }
          75% { transform: translateX(-50%) rotate(1deg); }
          100% { transform: translateX(-50%) rotate(0deg); }
        }
        .group:hover .group-hover\:animate-swing {
          animation: swing 2s ease-in-out infinite;
        }
        .group:hover .group-hover\:animate-swing-badge {
          animation: swing-badge 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
