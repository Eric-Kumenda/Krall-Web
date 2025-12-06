import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactHero from '../../components/sections/contact/ContactHero';
import ContactContent from '../../components/sections/contact/ContactContent';
import MapSection from '../../components/sections/contact/MapSection';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with The Krall. We are here to answer your questions and hear your feedback.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      <ContactHero />
      <ContactContent />
      <MapSection />
      <Footer />
    </main>
  );
}
