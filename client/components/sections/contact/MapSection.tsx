'use client';

import React from 'react';

export default function MapSection() {
  return (
    <section className="pb-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl shadow-black/50 grayscale hover:grayscale-0 transition-all duration-700">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.640492864264!2d36.75628807496587!3d-1.392288998594056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f05a26996656f%3A0x600366606130932!2sAcacia%20Village%20Estate!5e0!3m2!1sen!2ske!4v1709736000000!5m2!1sen!2ske" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold font-montserrat text-white mb-4">Looking for support?</h2>
          <p className="text-gray-400 mb-6">
            We might already have what you're looking for. See our FAQs or head to our dedicated Help Center.
          </p>
          <button className="px-8 py-3 rounded-full border border-gray-700 text-white font-bold hover:bg-white hover:text-gray-900 transition-all">
            Visit Help Center
          </button>
        </div>
      </div>
    </section>
  );
}
