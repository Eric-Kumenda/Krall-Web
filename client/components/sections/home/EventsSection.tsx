'use client';

import React, { useEffect } from 'react';
import SectionHeader from '../../SectionHeader';
import EventCard from '../../ui/EventCard';
import { Palette, Users, Music, Mic, Film, Trophy, BookOpen } from 'lucide-react';
import { fetchEvents, selectEvents } from '@/store/slices/eventsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function EventsSection() {
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectEvents);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Map icon names to components if needed, or pass the component directly in slice (not serializable)
  // Since we stored icon names in slice, we need a map
  const iconMap = {
    Palette: <Palette size={20} />,
    Users: <Users size={20} />,
    Music: <Music size={20} />,
    Mic: <Mic size={20} />,
    Film: <Film size={20} />,
    Trophy: <Trophy size={20} />,
    BookOpen: <BookOpen size={20} />
  };

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
              categoryIcon={iconMap[event.categoryIconName as keyof typeof iconMap]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
