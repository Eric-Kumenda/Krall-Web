import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import EventsHero from '../../components/sections/events/EventsHero';
import EventsList from '../../components/sections/events/EventsList';

export const metadata = {
  title: 'Events',
  description: 'Discover upcoming events, workshops, and exhibitions at The Krall.',
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      <EventsHero />
      <EventsList />
      <Footer />
    </main>
  );
}
