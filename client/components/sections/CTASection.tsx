import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-12 md:py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div 
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{ minHeight: '500px' }}
        >
          {/* Background Image with Parallax Effect */}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-fixed"
            style={{ 
              backgroundImage: 'url(https://bootstrapmade.com/content/demo/Impact/assets/img/cta-bg.jpg)',
            }}
          >
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent" />
          </div>
          
          {/* Content Container */}
          <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-16 lg:p-20 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm mb-6 w-fit">
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span className="text-primary font-bold text-sm uppercase tracking-wider">Make a Difference</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat text-white mb-6 leading-tight">
              Support Our <span className="bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Impact</span> Project
            </h2>
            
            <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl">
              Join us in creating lasting change in our community. Your support enables us to mentor more leaders, 
              host transformative events, and build a stronger future together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="group flex items-center justify-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-all transform hover:-translate-y-1 shadow-lg shadow-yellow-500/20"
                type="button"
              >
                Get Involved
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button 
                className="flex items-center justify-center gap-2 border border-white/30 bg-white/5 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all"
                type="button"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
