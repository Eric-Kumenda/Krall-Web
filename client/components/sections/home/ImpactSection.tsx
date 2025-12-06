import React from 'react';
import StatCard from '../../ui/StatCard';
import { ArrowRight } from 'lucide-react';

export default function ImpactSection() {
  const stats = [
    {
      number: '600+',
      label: 'Leaders Mentored',
      description: 'Empowering the next generation of visionaries through dedicated mentorship programs.'
    },
    {
      number: '2',
      label: 'Years of Service',
      description: 'Consistently delivering excellence and fostering community growth since our inception.'
    },
    {
      number: '15+',
      label: 'Community Partners',
      description: 'Collaborating with local and international organizations to maximize our impact.'
    }
  ];

  return (
    <section className="relative py-8 bg-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Text Content */}
          <div className="w-full lg:w-5/12 pt-4">
            <div className="inline-block mb-4">
              <span className="text-primary font-bold tracking-wider uppercase text-sm border-b-2 border-primary pb-1">
                Our Impact
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6 text-white leading-tight">
              Making a Real <span className="text-primary">Difference</span> in Our Community
            </h2>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We measure our success not just by numbers, but by the lives we touch and the communities we build. 
              Through our dedicated programs and services, we strive to create lasting positive change.
            </p>
            
            <button className="group flex items-center gap-2 text-white font-semibold hover:text-primary transition-colors">
              Read Our Annual Report
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="w-full lg:w-7/12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`relative group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 ${index === 2 ? 'md:col-span-2' : ''}`}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-primary blur-xl" />
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 font-montserrat">
                    {stat.number}
                  </h3>
                  
                  <h4 className="text-primary font-bold text-lg mb-3 uppercase tracking-wide">
                    {stat.label}
                  </h4>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
