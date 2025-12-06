import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ShopHero from '../../components/sections/shop/ShopHero';
import ShopGrid from '../../components/sections/shop/ShopGrid';

export const metadata = {
  title: 'Shop',
  description: 'Shop exclusive merchandise from The Krall. Wear the brand and support the community.',
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      <ShopHero />
      <ShopGrid />
      <Footer />
    </main>
  );
}
