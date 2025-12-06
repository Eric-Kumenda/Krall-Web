'use client';

import React from 'react';
import SectionHeader from '../../SectionHeader';
import TeamCard from '../../ui/TeamCard';

export default function TeamSection() {
  const team = [
    {
      name: 'Moses Kibe Kihiko',
      role: 'Director',
      image: 'https://plus.unsplash.com/premium_photo-1664392176522-452c3bd83244?w=500&auto=format&fit=crop&q=60',
      bio: 'Moses is a visionary leader with a passion for community development. He founded The Krall to provide a space for young creatives to thrive.',
      socials: {
        linkedin: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      name: 'Sarah Johnson',
      role: 'Program Manager',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60',
      bio: 'Sarah oversees all programs and events at The Krall. With a background in education, she ensures every workshop delivers value.',
      socials: {
        linkedin: '#',
        instagram: '#'
      }
    },
    {
      name: 'David Ochieng',
      role: 'Creative Lead',
      image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=500&auto=format&fit=crop&q=60',
      bio: 'David brings artistic vision to life. He mentors young artists and curates exhibitions that showcase local talent.',
      socials: {
        instagram: '#',
        twitter: '#'
      }
    },
    {
      name: 'Emily Wanjiku',
      role: 'Community Outreach',
      image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=500&auto=format&fit=crop&q=60',
      bio: 'Emily connects The Krall with the wider community. She builds partnerships that create opportunities for our members.',
      socials: {
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-primary font-bold tracking-wider uppercase text-sm border-b-2 border-primary pb-1">
            The Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-white mt-6 mb-6">
            Meet the <span className="text-primary">Visionaries</span>
          </h2>
          <p className="text-gray-400">
            We are committed to supporting independent storytellers on the African continent who describe the world as they see it, from their own unique histories, experiences, imaginings and lenses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <TeamCard key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
