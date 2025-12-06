import React from 'react';
import ServiceCard from '../ui/ServiceCard';
import { Book, Calendar, Camera, Coffee, Film, Home } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: <Book className="w-8 h-8" />,
      title: 'Library Services',
      description: 'Access our curated collection of resources designed to inspire and educate community members.',
      link: '/services#library'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Event Planning',
      description: 'Comprehensive event management services to bring your vision to life with precision and style.',
      link: '/services#event'
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: 'Creative Studio',
      description: 'State-of-the-art studio space equipped for photography, videography, and creative projects.',
      link: '/services#studio'
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: 'Coffee & Snack Bar',
      description: 'A cozy space to relax, network, and enjoy premium refreshments in a creative atmosphere.',
      link: '/services#coffee'
    },
    {
      icon: <Film className="w-8 h-8" />,
      title: 'Media Coverage',
      description: 'Professional photography and videography services to capture your most important moments.',
      link: '/services#photography'
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Exterior Lounge',
      description: 'Versatile outdoor space perfect for casual gatherings, BBQ events, and relaxation.',
      link: '/services#bbq'
    }
  ];

  return (
    <section className="py-20 bg-gray-900 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-sm border-b-2 border-primary pb-1">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-white mt-6 mb-4">
            Everything You Need to <span className="text-primary">Create & Connect</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Discover our comprehensive range of services designed to support your creative journey and community engagement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
