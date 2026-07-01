import React from 'react';
import { ShieldCheck, Heart, Mail, Phone, MapPin, Gauge } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-card-dark border-t border-white/10 pt-16 pb-8 rounded-t-[40px] mt-16 relative z-10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-black font-extrabold shadow-md shadow-yellow-400/20">
                <Gauge className="w-5.5 h-5.5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white uppercase">
                  Urban<span className="text-yellow-400 font-bold lowercase">Wheels</span>
                </span>
                <span className="block text-[8px] tracking-widest text-zinc-500 font-black uppercase">
                  Uttarkashi Mobility
                </span>
              </div>
            </div>
            
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Urban Wheels is Uttarkashi's premier self-drive mobility network. Rent premium scooties and bikes (Honda Activa, Suzuki Access, Royal Enfield adventure tourers) starting at budget-friendly rates to explore the majestic Himalayas.
            </p>

            <div className="space-y-2 pt-2 text-xs text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-yellow-400 shrink-0 mt-0.5" />
                <span>
                  Santri's CSC, Ward No. 08, Joshiyara, Uttarkashi, Uttarakhand – 249193
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-yellow-400" />
                <span>+91 7818971990</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-yellow-400" />
                <span>shivomsantrii@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Contact Channels (Requested Modes of Contact) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-black tracking-widest text-white uppercase">
              Quick Connect
            </h4>
            <p className="text-[11px] text-zinc-400">
              Pilgrims, tourists, and commuters can reach out instantly via our priority digital channels:
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {/* Call Now */}
              <a
                href="tel:+917818971990"
                id="footer-call"
                className="bg-white/5 border border-white/10 hover:border-yellow-400/50 hover:bg-white/10 p-3 rounded-xl flex items-center gap-2.5 transition-all text-xs text-white font-bold cursor-pointer shadow-sm"
              >
                <span className="text-sm">📞</span>
                <div>
                  <span className="block text-[7px] text-zinc-500 font-bold uppercase leading-tight">Phone Call</span>
                  <span className="block text-[10px] leading-tight">Call Desk</span>
                </div>
              </a>

              {/* WhatsApp Chat */}
              <a
                href="https://wa.me/917818971990?text=Hello%20Urban%20Wheels!%20I%20would%20like%20to%20rent%20a%20scooty/bike."
                target="_blank"
                rel="noopener noreferrer"
                id="footer-whatsapp"
                className="bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 p-3 rounded-xl flex items-center gap-2.5 transition-all text-xs text-white font-bold cursor-pointer shadow-sm"
              >
                <span className="text-sm">💬</span>
                <div>
                  <span className="block text-[7px] text-zinc-500 font-bold uppercase leading-tight">WhatsApp</span>
                  <span className="block text-[10px] leading-tight">Chat Now</span>
                </div>
              </a>

              {/* Email Inbox */}
              <a
                href="mailto:shivomsantrii@gmail.com"
                id="footer-email"
                className="bg-white/5 border border-white/10 hover:border-blue-400/50 hover:bg-white/10 p-3 rounded-xl flex items-center gap-2.5 transition-all text-xs text-white font-bold cursor-pointer shadow-sm"
              >
                <span className="text-sm">✉️</span>
                <div>
                  <span className="block text-[7px] text-zinc-500 font-bold uppercase leading-tight">Email</span>
                  <span className="block text-[10px] leading-tight">Send Mail</span>
                </div>
              </a>

              {/* Google Maps Location */}
              <a
                href="https://maps.google.com/?q=Santri's+CSC,+Ward+No.+08,+Joshiyara,+Uttarkashi,+Uttarakhand+249193"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-maps"
                className="bg-white/5 border border-white/10 hover:border-red-400/50 hover:bg-white/10 p-3 rounded-xl flex items-center gap-2.5 transition-all text-xs text-white font-bold cursor-pointer shadow-sm"
              >
                <span className="text-sm">📍</span>
                <div>
                  <span className="block text-[7px] text-zinc-500 font-bold uppercase leading-tight">Google Maps</span>
                  <span className="block text-[10px] leading-tight">Our Hub</span>
                </div>
              </a>
            </div>
          </div>

          {/* Column 3: Trust & Protection */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-black tracking-widest text-white uppercase">
              Mountain Trust
            </h4>
            
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex gap-3 shadow-md">
              <ShieldCheck className="w-8 h-8 text-yellow-400 shrink-0" />
              <div>
                <span className="block text-xs font-bold text-white">Mountain Travel Insurance</span>
                <span className="block text-[10px] text-zinc-400 mt-1 leading-normal">
                  All rides and self-drive rentals booked with Urban Wheels are protected under comprehensive passenger transit safety guidelines. Enjoy peace of mind.
                </span>
              </div>
            </div>

            <div className="text-[10px] text-zinc-500 font-medium leading-relaxed">
              We operate from Joshiyara Ward 08, delivering premium, prompt mobility services for pilgrims visiting the Gangotri Dham shrine.
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/10 w-full mb-8" />

        {/* Lower footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} Urban Wheels Uttarkashi. All rights reserved.
          </div>
          
          <div className="flex gap-4">
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Self-Drive Policy</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Crafted in Uttarkashi with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for travelers</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
