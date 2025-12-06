'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Services', href: '/services' },
    { title: 'Events', href: '/events' },
    { title: 'Contact', href: '/contact' },
    { title: 'Shop', href: '/shop' },
  ];

  return (
    <>
      <nav 
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
          scrolled 
            ? 'top-4 w-[90%] md:w-[85%] lg:w-[1000px] rounded-full bg-gray-900/80 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20 py-3 px-6' 
            : 'top-0 w-full bg-transparent py-6 px-4 md:px-8 border-b border-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110">
              <Image 
                src="/assets/img/Krall Logo -Primary.svg" 
                alt="Krall Logo" 
                width={40} 
                height={40}
                className="object-contain"
              />
            </div>
            <span className="hidden font-montserrat font-bold text-lg md:text-xl text-white tracking-wider">
              KRALL <span className="text-primary">KONSULT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5 backdrop-blur-sm">
            {navItems.map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="px-5 py-2 rounded-full text-sm font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden lg:block">
            <Link 
              href="/contact" 
              className="px-6 py-2 rounded-full bg-primary text-gray-900 font-bold text-sm hover:bg-yellow-400 transition-colors shadow-lg shadow-primary/20"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:text-primary transition-colors"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-gray-900/95 backdrop-blur-xl z-40 transition-all duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item, index) => (
            <Link 
              key={index}
              href={item.href} 
              className="text-2xl font-bold text-white hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          <Link 
            href="/contact" 
            className="px-8 py-3 rounded-full bg-primary text-gray-900 font-bold text-lg hover:bg-yellow-400 transition-colors mt-8"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}
