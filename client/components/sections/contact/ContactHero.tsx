'use client';

import React from 'react';
import Image from 'next/image';

export default function ContactHero() {
  return (
    <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Contact Us"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-900/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold font-montserrat text-white mb-4">
          Get in <span className="text-primary">Touch</span>
        </h1>
        <p className="text-lg text-gray-200 max-w-xl mx-auto leading-relaxed font-light">
          We'd love to hear from you. Whether you have a question about our programs, events, or just want to say hello.
        </p>
      </div>
    </section>
  );
}
