import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ServicesHero from '../../components/sections/services/ServicesHero';
import ServicesGrid from '../../components/sections/services/ServicesGrid';

export const metadata = {
  title: 'Our Services',
  description: 'Explore the wide range of services offered by The Krall, from creative spaces to event planning.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      <ServicesHero />
      <ServicesGrid />
      <Footer />
    </main>
  );
}
