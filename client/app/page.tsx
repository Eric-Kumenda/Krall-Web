
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/sections/home/HeroSection';
import WhatWeAreSection from '../components/sections/home/WhatWeAreSection';
import ImpactSection from '../components/sections/home/ImpactSection';
// import ClientLogosSection from '../components/sections/home/ClientLogosSection';
import CTASection from '../components/sections/home/CTASection';
import ServicesSection from '../components/sections/home/ServicesSection';
import EventsSection from '../components/sections/home/EventsSection';
import TestimonialsSection from '../components/sections/home/TestimonialsSection';

export const metadata = {
  description: 'The Krall - Fulfilling small dreams and big plans. A hub for creativity, mentorship, and community growth.',
};
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <WhatWeAreSection />
      <ImpactSection />
      {/* <ClientLogosSection /> */}
      <CTASection />
      <ServicesSection />
      <EventsSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
