import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import WhatWeAreSection from '@/components/sections/WhatWeAreSection';
import ImpactSection from '@/components/sections/ImpactSection';
import ClientLogosSection from '@/components/sections/ClientLogosSection';
import CTASection from '@/components/sections/CTASection';
import ServicesSection from '@/components/sections/ServicesSection';
import EventsSection from '@/components/sections/EventsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

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
