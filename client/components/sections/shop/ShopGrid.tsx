'use client';

import React, { useState } from 'react';
import ProductCard from '../../ui/ProductCard';

const categories = [
  { id: 'all', label: 'All Items' },
  { id: 'apparel', label: 'Apparel' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'art', label: 'Art Prints' },
];

const products = [
  {
    id: '1',
    name: 'Krall Signature Hoodie',
    price: 2500,
    originalPrice: 3000,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=60',
    category: 'apparel',
    isNew: true,
    discount: 15
  },
  {
    id: '2',
    name: 'Urban Tote Bag',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=60',
    category: 'accessories',
    isNew: true
  },
  {
    id: '3',
    name: 'Classic Snapback Cap',
    price: 1000,
    originalPrice: 1200,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=60',
    category: 'accessories',
    discount: 20
  },
  {
    id: '4',
    name: 'Limited Edition Tee',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60',
    category: 'apparel'
  },
  {
    id: '5',
    name: 'Abstract Canvas Print',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1633511298265-4c224d5b62a5?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'art',
    isNew: true
  },
  {
    id: '6',
    name: 'Krall Coffee Mug',
    price: 800,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&auto=format&fit=crop&q=60',
    category: 'accessories'
  },
  {
    id: '7',
    name: 'Denim Jacket',
    price: 3500,
    originalPrice: 4000,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=60',
    category: 'apparel',
    discount: 12
  },
  {
    id: '8',
    name: 'Minimalist Notebook',
    price: 500,
    image: 'https://images.unsplash.com/photo-1595085787828-f1b6e3e7f93e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'accessories'
  }
];

export default function ShopGrid() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-primary text-gray-900 shadow-lg shadow-primary/20 scale-105'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
