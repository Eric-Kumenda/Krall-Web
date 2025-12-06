import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      <h3 className="font-montserrat text-2xl md:text-3xl">{title}</h3>
      {subtitle && <p className="text-sm mt-2 mb-2">{subtitle}</p>}
      <hr className="mx-auto border-primary border-t-3 opacity-100 my-1 w-16" />
    </div>
  );
}
