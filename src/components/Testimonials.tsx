import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 relative z-10 border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-black tracking-widest text-yellow-600 uppercase">
            Reviews & feedback
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight mt-2">
            Trusted by Thousands of Commuters
          </h2>
          <p className="text-sm text-zinc-600 mt-4 font-medium">
            Hear from our everyday users about their travel experiences, budget savings, and safety ratings with Urban Wheels.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              id={`testimonial-${item.id}`}
              className="glass-card border border-white/50 hover:border-zinc-300 rounded-2xl p-6 transition-all duration-300 relative flex flex-col justify-between group hover:shadow-md"
            >
              {/* Quote Decorative Icon */}
              <div className="absolute right-6 top-6 text-zinc-300/40 group-hover:text-yellow-500/20 transition-colors">
                <Quote size={32} />
              </div>

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(item.rating) ? 'fill-yellow-400 stroke-yellow-400' : 'text-zinc-300'}
                    />
                  ))}
                  <span className="text-xs font-bold text-zinc-500 ml-1">
                    {item.rating}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs md:text-sm text-zinc-700 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-zinc-800 tracking-tight">
                      {item.name}
                    </h4>
                    <span className="block text-[10px] text-zinc-400 font-semibold">
                      {item.role}
                    </span>
                  </div>
                </div>

                {/* Ride Mode Badge */}
                <span className="bg-yellow-400/15 text-yellow-600 text-[9px] font-extrabold px-2.5 py-1 rounded-md border border-yellow-400/20 shadow-sm uppercase tracking-wide">
                  {item.rideType}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Counter Promo banner */}
        <div className="mt-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl p-6 md:p-8 text-black flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-yellow-400/5">
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-black">
              Ready to feel the difference?
            </h3>
            <p className="text-xs md:text-sm text-black/80 font-bold mt-1">
            Join over 10,000+ happy pilgrims, tourists, and locals cruising safely across Uttarakhand.
            </p>
          </div>
          
          <button
            id="schedule-ride-cta"
            onClick={() => {
              const el = document.getElementById('hero');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-black hover:bg-zinc-900 text-white font-extrabold px-6 py-3 rounded-xl shadow-xl transition-all text-xs uppercase tracking-wider shrink-0 cursor-pointer"
          >
            Schedule Your Rental Now
          </button>
        </div>

      </div>
    </section>
  );
}
