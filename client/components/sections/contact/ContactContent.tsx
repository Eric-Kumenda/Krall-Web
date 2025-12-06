'use client';

import React from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function ContactContent() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-3xl p-8 md:p-10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold font-montserrat text-white mb-6">
              Send us a <span className="text-primary">Message</span>
            </h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-gray-400 ml-1">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    placeholder="Your Name"
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-gray-400 ml-1">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    placeholder="your@email.com"
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-bold text-gray-400 ml-1">Subject</label>
                <select 
                  id="subject"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="events">Events & Programs</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-gray-400 ml-1">Message</label>
                <textarea 
                  id="message"
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-gray-900 font-bold py-4 rounded-xl hover:bg-yellow-400 transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold font-montserrat text-white mb-6">
                Contact <span className="text-primary">Information</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Fill out the form and we will get back to you within 24 hours. You can also reach us directly through the following channels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="bg-gray-800/20 border border-gray-700/30 rounded-2xl p-6 hover:bg-gray-800/40 transition-colors group">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <h3 className="text-white font-bold mb-2">Call Us</h3>
                <p className="text-gray-400 text-sm">+254 537 53 082</p>
                <p className="text-gray-400 text-sm">+254 537 53 000</p>
              </div>

              {/* Email */}
              <div className="bg-gray-800/20 border border-gray-700/30 rounded-2xl p-6 hover:bg-gray-800/40 transition-colors group">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <h3 className="text-white font-bold mb-2">Email Us</h3>
                <p className="text-gray-400 text-sm">info@thekrallkonsult.com</p>
                <p className="text-gray-400 text-sm">admin@krall.com</p>
              </div>

              {/* Location */}
              <div className="bg-gray-800/20 border border-gray-700/30 rounded-2xl p-6 hover:bg-gray-800/40 transition-colors group">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <h3 className="text-white font-bold mb-2">Visit Us</h3>
                <p className="text-gray-400 text-sm">11 Mwewe St, Acacia Village</p>
                <p className="text-gray-400 text-sm">Ongata Rongai, Kenya</p>
              </div>

              {/* Hours */}
              <div className="bg-gray-800/20 border border-gray-700/30 rounded-2xl p-6 hover:bg-gray-800/40 transition-colors group">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Clock size={24} />
                </div>
                <h3 className="text-white font-bold mb-2">Working Hours</h3>
                <p className="text-gray-400 text-sm">Mon - Fri: 8:00 - 18:00</p>
                <p className="text-gray-400 text-sm">Sat - Sun: 10:00 - 16:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
