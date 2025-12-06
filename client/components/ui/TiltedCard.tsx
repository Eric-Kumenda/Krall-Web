'use client';
import React, { useRef, useState } from 'react';

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number;
  scale?: number;
  glareOpacity?: number;
}

export default function TiltedCard({ 
  children, 
  className = '', 
  maxRotation = 15,
  scale = 1.05,
  glareOpacity = 0.4
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareData, setGlareData] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    setRotateX(yPct * -maxRotation);
    setRotateY(xPct * maxRotation);
    setGlareData({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: glareOpacity
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlareData({ ...glareData, opacity: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? scale : 1}, ${isHovered ? scale : 1}, 1)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay rounded-[inherit] z-20"
        style={{
          background: `radial-gradient(circle at ${glareData.x}% ${glareData.y}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
          opacity: glareData.opacity,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
}
