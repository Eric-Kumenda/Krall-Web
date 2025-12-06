'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  discount?: number;
}

export default function ProductCard({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  category,
  isNew,
  discount 
}: ProductCardProps) {
  return (
    <div className="group relative bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-800">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {isNew && (
            <span className="bg-primary text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              New
            </span>
          )}
          {discount && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              -{discount}%
            </span>
          )}
        </div>

        {/* Action Buttons (Hover) */}
        <div className="absolute right-4 top-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 z-10">
          <button className="w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-primary hover:text-gray-900 transition-colors shadow-lg" aria-label="Add to Wishlist">
            <Heart size={18} />
          </button>
          <button className="w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-primary hover:text-gray-900 transition-colors shadow-lg" aria-label="Quick View">
            <Eye size={18} />
          </button>
        </div>

        {/* Add to Cart Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <button className="w-full bg-white text-gray-900 font-bold py-3 rounded-xl hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-lg">
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{category}</p>
        <h3 className="text-white font-bold font-montserrat text-lg mb-2 truncate group-hover:text-primary transition-colors cursor-pointer">
          {name}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-primary font-bold text-lg">KES {price.toLocaleString()}</span>
          {originalPrice && (
            <span className="text-gray-600 text-sm line-through">KES {originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
}
