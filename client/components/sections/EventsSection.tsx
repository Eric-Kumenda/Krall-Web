'use client';

import React from 'react';
import SectionHeader from '../SectionHeader';
import EventCard from '../ui/EventCard';
import { Palette, Users, Music, Mic } from 'lucide-react';

export default function EventsSection() {
  const events = [
    {
      day: '30',
      month: 'Sep',
      dateFull: 'September 30, 2017',
      title: 'Community Art Workshop',
      description: 'Join us for an immersive art workshop designed to unleash your creativity. Perfect for all skill levels, this event focuses on collaborative mural painting.',
      imageUrl: 'https://yevgenysim-turkey.github.io/touche/assets/img/8.jpg',
      categoryIcon: <Palette className="w-6 h-6 text-purple-600" />,
      categoryColor: '#9333ea' // Purple
    },
    {
      day: '29',
      month: 'Sep',
      dateFull: 'September 29, 2017',
      title: 'Networking Night',
      description: 'Connect with local professionals and community leaders. An evening of meaningful conversations, idea sharing, and building lasting relationships.',
      imageUrl: 'https://yevgenysim-turkey.github.io/touche/assets/img/9.jpg',
      categoryIcon: <Users className="w-6 h-6 text-blue-600" />,
      categoryColor: '#2563eb' // Blue
    },
    {
      day: '28',
      month: 'Sep',
      dateFull: 'September 28, 2017',
      title: 'Live Music Showcase',
      description: 'Experience the best local talent at our monthly music showcase. Enjoy a variety of genres and support emerging artists in our community.',
      imageUrl: 'https://yevgenysim-turkey.github.io/touche/assets/img/10.jpg',
      categoryIcon: <Music className="w-6 h-6 text-pink-600" />,
      categoryColor: '#db2777' // Pink
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="text-primary font-bold tracking-wider uppercase text-sm border-b-2 border-primary pb-1">
            Upcoming Events
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-white mt-6">
            Join the <span className="text-primary">Excitement</span>
          </h2>
        </div>
        
        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          {events.map((event, index) => (
            <EventCard
              key={index}
              {...event}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
