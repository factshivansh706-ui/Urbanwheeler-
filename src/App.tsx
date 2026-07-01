import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, MapPin, Search, Calendar, Users, Star, ArrowRight, ArrowRightLeft, Leaf, Phone, Sparkles, Smartphone, Download, MapPinCheck } from 'lucide-react';
import Header from './components/Header';
import BookingForm from './components/BookingForm';
import RideSelector from './components/RideSelector';
import MapSimulation from './components/MapSimulation';
import ActiveRideStatus from './components/ActiveRideStatus';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { BookingState, ActiveRide, RideOption } from './types';
import { popularDestinations, rideOptions } from './data';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Initialize booking state with clean tomorrow commute defaults
  const [booking, setBooking] = useState<BookingState>({
    pickup: "Santri's CSC, Joshiyara",
    pickupLatLng: [30.7251, 78.4370],
    destination: 'Kashi Vishwanath Temple',
    destinationLatLng: [30.7268, 78.4335],
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    time: '09:30',
    serviceType: 'rental',
    passengers: 1,
    selectedRideId: 'scooter_rental',
    customerName: '',
    customerMobile: '',
  });

  // Active simulated ride state
  const [activeRide, setActiveRide] = useState<ActiveRide | null>(null);

  // Auto-scroll helper
  const scrollToBooking = () => {
    const el = document.getElementById('booking-core');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBookingChange = (updates: Partial<BookingState>) => {
    setBooking((prev) => ({ ...prev, ...updates }));
  };

  const handleSearchRides = () => {
    // Automatically pre-select recommended option when searching
    setBooking((prev) => ({ ...prev, selectedRideId: 'scooter_rental' }));
    
    // Smooth scroll to the fleet options list
    setTimeout(() => {
      const fleetEl = document.getElementById('fleet');
      if (fleetEl) {
        fleetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleSelectRide = (id: string) => {
    handleBookingChange({ selectedRideId: id });
  };

  const handleConfirmBooking = () => {
    if (!booking.customerName.trim()) {
      alert("Please enter your Name to proceed.");
      return;
    }
    if (!booking.customerMobile.trim()) {
      alert("Please enter your Mobile Number.");
      return;
    }
    if (!booking.pickup.trim()) {
      alert("Please enter a Pickup Location.");
      return;
    }
    if (!booking.date) {
      alert("Please select a Rental Date.");
      return;
    }
    if (!booking.time) {
      alert("Please select a Pickup Time.");
      return;
    }
    if (!booking.selectedRideId) {
      alert("Please select a Scooter or Bike model.");
      return;
    }

    const chosenOption = rideOptions.find((o) => o.id === booking.selectedRideId) || null;
    
    setActiveRide({
      id: "UW-" + Math.floor(100000 + Math.random() * 900000).toString(),
      status: 'completed',
      pickup: booking.pickup,
      destination: booking.destination,
      serviceType: 'rental',
      passengers: booking.passengers,
      rideOption: chosenOption,
      driver: null,
      otp: '',
      progress: 100,
    });

    // Scroll up to the map booking zone to see the live matching!
    scrollToBooking();
  };

  const handleActiveRideUpdate = (updates: Partial<ActiveRide>) => {
    setActiveRide((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const handleCancelActiveRide = () => {
    setActiveRide(null);
    setBooking((prev) => ({ ...prev, selectedRideId: null }));
  };

  const handlePopularDestinationSelect = (name: string) => {
    handleBookingChange({
      destination: name,
      selectedRideId: null, // Reset previous selections
    });
    scrollToBooking();
  };

  return (
    <div className="bg-slate-50 min-h-screen text-zinc-800 selection:bg-yellow-400 selection:text-black relative overflow-x-hidden">
      {/* Background ambient light glowing bubbles */}
      <div className="absolute top-20 left-1/4 w-[350px] h-[350px] bg-yellow-200/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[450px] right-1/4 w-[400px] h-[400px] bg-amber-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-96 left-10 w-[300px] h-[300px] bg-yellow-300/20 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Sticky Header */}
      <Header onBookClick={scrollToBooking} />

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative pt-28 md:pt-36 pb-16 overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,221,0,0.18),rgba(0,0,0,0))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 glass-premium px-4 py-2 rounded-full text-xs font-bold text-yellow-600 animate-fade-in shadow-sm">
              <Sparkles className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
              <span>Premium Two-Wheeler Rentals</span>
            </div>

            {/* Main Headline */}
            <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-900 tracking-tight leading-[1.15]">
              Rent a Scooty in Uttarkashi <br className="hidden sm:block" />
              <span className="text-yellow-600 bg-yellow-400/20 px-4 py-1.5 rounded-2xl font-black inline-block mt-2">Affordable, Safe & Reliable</span>
            </h1>

            {/* Sub-Headline */}
            <p className="text-sm md:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed font-semibold">
              Explore the Himalayas on your own terms. Book high-quality gearless scooties or adventure tourer motorbikes quickly, safely, and affordably across Uttarkashi.
            </p>

            {/* Active Tickers to showcase premium active product */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 pt-4">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-zinc-600">
                  <span className="text-zinc-900 font-extrabold">120+</span> Scooties & Bikes Ready
                </span>
              </div>
              <span className="hidden sm:inline text-zinc-300">•</span>
              <div className="flex items-center gap-2.5">
                <span className="text-yellow-600 text-xs">⚡</span>
                <span className="text-xs font-bold text-zinc-600">
                  <span className="text-zinc-900 font-extrabold">10,000+</span> Satisfied Riders
                </span>
              </div>
              <span className="hidden sm:inline text-zinc-300">•</span>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
                <span className="text-xs font-bold text-zinc-600">
                  100% Insured Fleet
                </span>
              </div>
            </div>

            {/* Primary Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="hero-book-btn"
                onClick={scrollToBooking}
                className="btn-yellow-premium px-8 py-3.5 rounded-xl transition-all text-sm tracking-tight cursor-pointer font-extrabold inline-flex items-center justify-center gap-2 uppercase shadow-lg shadow-yellow-400/10"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                href="tel:+917818971990"
                id="hero-call-btn"
                className="bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold px-8 py-3.5 rounded-xl transition-all text-sm tracking-tight cursor-pointer inline-flex items-center justify-center gap-2 uppercase shadow-md"
              >
                <span>Call Now</span>
                <Phone className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MAIN BOOKING WORKSPACE (Grid layout with Map) */}
      <section id="booking-core" className="py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* LEFT COLUMN: Booking Form or Active Ride Overlay (Span 5) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {activeRide ? (
                  <motion.div
                    key="active-ride-status"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ActiveRideStatus
                      activeRide={activeRide}
                      booking={booking}
                      onCancel={handleCancelActiveRide}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="booking-form"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <BookingForm
                      booking={booking}
                      onChange={handleBookingChange}
                      onSearch={handleConfirmBooking}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: Live Interactive Map (Span 7) */}
            <div className="lg:col-span-7">
              <MapSimulation
                pickupName={booking.pickup}
                destinationName={booking.destination}
                activeRide={activeRide}
                pickupLatLng={booking.pickupLatLng}
                destinationLatLng={booking.destinationLatLng}
              />
            </div>

          </div>

          {/* 3. DYNAMIC FLEET SELECTOR OPTIONS (Only visible when active ride is not active) */}
          <AnimatePresence>
            {!activeRide && booking.selectedRideId && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4 }}
              >
                <RideSelector
                  booking={booking}
                  selectedRideId={booking.selectedRideId}
                  onSelect={handleSelectRide}
                  onConfirm={handleConfirmBooking}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* 4. POPULAR DESTINATIONS GRID */}
      <section className="py-12 border-t border-slate-200/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-6">
            <span className="text-xs font-bold tracking-widest text-yellow-600 uppercase">
              One-Click Routing
            </span>
            <h3 className="text-lg font-black text-zinc-900 tracking-tight mt-0.5">
              Popular Rental Destinations
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Select any trending explore landmark below to instantly update route calculations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {popularDestinations.map((item) => (
              <div
                key={item.name}
                id={`popular-dest-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => handlePopularDestinationSelect(item.name)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 group flex flex-col justify-between border ${
                  booking.destination === item.name
                    ? 'bg-yellow-400/20 border-yellow-400 text-zinc-900 ring-2 ring-yellow-400/10'
                    : 'glass-card border-white/50 hover:border-zinc-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-white/80 border border-white/40 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <MapPinCheck className={`w-4 h-4 ${booking.destination === item.name ? 'text-yellow-600' : 'text-zinc-500'}`} />
                  </div>
                  <h4 className="text-xs font-black text-zinc-800 tracking-tight line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-[9px] font-bold text-zinc-400 uppercase tracking-wider border-t border-zinc-100 pt-2">
                  <span>Fast Route</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. WHY CHOOSE US & APP FEATURES SECTION */}
      <Features />

      {/* 6. TESTIMONIALS CAROUSEL */}
      <Testimonials />

      {/* 7. FAQ COMPONENT */}
      <FAQ />

      {/* 8. DOWNLOAD CTA BANNER */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="glass-card-dark rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Visual Phone mock column on left */}
            <div className="md:col-span-5 flex justify-center order-2 md:order-1">
              <div className="relative w-52 h-[400px] bg-zinc-950 rounded-[40px] border-8 border-zinc-800 shadow-2xl p-3 flex flex-col justify-between">
                {/* Speaker pill top */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-zinc-800 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-zinc-700 mr-1" />
                  <div className="w-4 h-[2px] rounded-full bg-zinc-700" />
                </div>

                {/* Inside simulated app UI */}
                <div className="h-full flex flex-col justify-between pt-6 pb-2 text-white">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <div className="flex items-center gap-1">
                      <Zap size={10} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-[9px] font-black tracking-tight">Urban Wheels Mobile</span>
                    </div>
                    <span className="text-[7px] bg-yellow-400 text-black px-1.5 rounded font-black">4.95★</span>
                  </div>

                  {/* Booking Simulation Box */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 space-y-1.5 my-auto">
                    <span className="block text-[6px] font-bold text-zinc-500 uppercase tracking-widest">Active Scooter Rental</span>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-black text-white">Gangotri Temple</span>
                      <span className="text-[9px] font-bold text-yellow-400">₹800</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-950 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 w-3/5" />
                    </div>
                    <span className="block text-[5px] text-zinc-400">Joshiyara Hub handoff ready</span>
                  </div>

                  <div className="bg-yellow-400 text-black py-2 rounded-xl text-[9px] font-black text-center tracking-wide uppercase">
                    SOS Safety Active
                  </div>
                </div>
              </div>
            </div>

            {/* Copy content on right */}
            <div className="md:col-span-7 space-y-6 order-1 md:order-2">
              <span className="text-xs font-black tracking-widest text-yellow-400 uppercase">
                Download the rental app
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Unlock Easy Himalayan Travel Everywhere
              </h2>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                Scan, tap, and rent scooties or motorbikes instantly on our companion app. Enjoy quick UPI checkouts, active GPS navigation, and premium emergency SOS backup services.
              </p>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  id="dl-android-btn"
                  onClick={() => alert('Urban Wheels Commuter Android App download started!')}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold px-5 py-3 rounded-xl text-xs flex items-center justify-center gap-2.5 cursor-pointer shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <Download size={15} />
                  <span>Get on Android Play Store</span>
                </button>
                <button
                  type="button"
                  id="dl-ios-btn"
                  onClick={() => alert('Urban Wheels Commuter iOS App download started!')}
                  className="bg-zinc-950 hover:bg-zinc-850 border border-zinc-850 text-white font-extrabold px-5 py-3 rounded-xl text-xs flex items-center justify-center gap-2.5 cursor-pointer shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <Smartphone size={15} />
                  <span>Get on Apple App Store</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. PROFESSIONAL FOOTER */}
      <Footer />
    </div>
  );
}
