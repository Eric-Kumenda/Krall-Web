import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AboutHero from '../../components/sections/about/AboutHero';
import StorySection from '../../components/sections/about/StorySection';
import MissionVisionSection from '../../components/sections/about/MissionVisionSection';
import TeamSection from '../../components/sections/about/TeamSection';

export const metadata = {
  title: 'About Us',
  description: 'Learn about The Krall, our mission, vision, and the team behind the community.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      <AboutHero />
      <StorySection />
      <MissionVisionSection />
      <TeamSection />
      <Footer />
    </main>
  );
}
