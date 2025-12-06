import React from 'react';

interface StatCardProps {
  number: string;
  label: string;
  description: string;
  className?: string;
}

export default function StatCard({ number, label, description, className = '' }: StatCardProps) {
  return (
    <div className={`border-b md:border-r py-3 ${className}`}>
      <h1 className="py-3 ps-3 text-center md:text-start text-4xl md:text-5xl font-bold">{number}</h1>
      <h6 className="text-red-500 text-center md:text-start font-semibold text-sm">{label}</h6>
      <p className="text-sm mt-2">{description}</p>
    </div>
  );
}
