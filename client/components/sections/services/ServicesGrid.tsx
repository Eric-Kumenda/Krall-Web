'use client';

import React from 'react';
import ServiceImageCard from '../../ui/ServiceImageCard';

const services = [
  {
    title: 'Library Services',
    description: 'A quiet, resourceful space for reading, research, and study. Access a wide collection of books and digital resources in a comfortable environment.',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=60',
    link: '#'
  },
  {
    title: 'Barbeque & Lounge',
    description: 'Relax and unwind in our exterior lounge. Enjoy delicious barbeque and refreshments in a social, open-air setting perfect for networking.',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=60',
    link: '#'
  },
  {
    title: 'Photography & Video',
    description: 'Professional coverage for your events. Our team captures every moment with high-quality photography and videography services.',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60',
    link: '#'
  },
  {
    title: 'Event Planning',
    description: 'End-to-end event management. We handle everything from logistics to execution, ensuring your event is memorable and stress-free.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60',
    link: '#'
  },
  {
    title: 'Creative Studio',
    description: 'A fully equipped studio space for artists and creators. Ideal for workshops, rehearsals, and creative projects requiring a professional environment.',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=60',
    link: '#'
  },
  {
    title: 'Coffee & Snack Bar',
    description: 'Fuel your creativity with premium coffee and light snacks. A perfect spot for casual meetings or a quick break during your work.',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=60',
    link: '#'
  }
];

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceImageCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
