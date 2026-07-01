import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, Calendar, Clock, Users, ArrowRightLeft, Search, Check, Info, Bike, Car, Loader2, User, Phone, ArrowRight } from 'lucide-react';
import { BookingState, LocationSuggestion } from '../types';
import { popularDestinations } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface BookingFormProps {
  booking: BookingState;
  onChange: (updates: Partial<BookingState>) => void;
  onSearch: () => void;
}

export default function BookingForm({ booking, onChange, onSearch }: BookingFormProps) {
  const [pickupFocus, setPickupFocus] = useState(false);
  const [destFocus, setDestFocus] = useState(false);

  const pickupRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  // Click outside suggestions handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickupRef.current && !pickupRef.current.contains(event.target as Node)) {
        setPickupFocus(false);
      }
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setDestFocus(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwap = () => {
    onChange({
      pickup: booking.destination,
      pickupLatLng: booking.destinationLatLng,
      destination: booking.pickup,
      destinationLatLng: booking.pickupLatLng,
    });
  };

  const selectPickup = (suggestion: LocationSuggestion) => {
    onChange({
      pickup: suggestion.name,
      pickupLatLng: suggestion.latLng,
    });
    setPickupFocus(false);
  };

  const selectDestination = (suggestion: LocationSuggestion) => {
    onChange({
      destination: suggestion.name,
      destinationLatLng: suggestion.latLng,
    });
    setDestFocus(false);
  };

  const [isDetecting, setIsDetecting] = useState(false);

  const detectCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsDetecting(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Attempt to reverse geocode the coordinates using free OSM Nominatim
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
              headers: {
                'Accept-Language': 'en',
                'User-Agent': 'UrbanWheelsUttarkashi/1.0'
              }
            }
          );
          
          if (response.ok) {
            const data = await response.json();
            const addr = data.address;
            let displayName = '';
            
            if (addr) {
              const parts = [];
              if (addr.road || addr.street) parts.push(addr.road || addr.street);
              if (addr.suburb || addr.neighbourhood) parts.push(addr.suburb || addr.neighbourhood);
              if (addr.city || addr.town || addr.village) parts.push(addr.city || addr.town || addr.village);
              if (addr.state) parts.push(addr.state);
              
              displayName = parts.filter(Boolean).slice(0, 3).join(', ');
            }
            
            if (!displayName && data.display_name) {
              displayName = data.display_name.split(',').slice(0, 3).join(',').trim();
            }
            
            const finalPickupName = displayName || `Detected Location (${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E)`;
            
            onChange({
              pickup: finalPickupName,
              pickupLatLng: [latitude, longitude],
            });
          } else {
            onChange({
              pickup: `Detected Location (${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E)`,
              pickupLatLng: [latitude, longitude],
            });
          }
        } catch (error) {
          console.error("Error reverse geocoding location:", error);
          onChange({
            pickup: `Detected Location (${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E)`,
            pickupLatLng: [latitude, longitude],
          });
        } finally {
          setIsDetecting(false);
          setPickupFocus(false);
        }
      },
      (error) => {
        console.error("Error getting user location:", error);
        let errorMsg = "Unable to retrieve your location.";
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = "Location permission was denied. Please enable location permissions in your browser or select a hub from the list.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = "Location information is unavailable.";
        } else if (error.code === error.TIMEOUT) {
          errorMsg = "The request to get user location timed out.";
        }
        alert(errorMsg);
        setIsDetecting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="glass-card rounded-2xl p-5 md:p-6 shadow-2xl relative border-white/60">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h3 className="text-lg font-black text-zinc-900 tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-5 bg-yellow-400 rounded-full inline-block" />
          Plan Your Scooter / Bike Rental
        </h3>
      </div>

      <div className="space-y-4">
        {/* Customer Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center glass-input rounded-xl px-3.5 py-3 focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400 transition-all">
            <User className="w-5 h-5 text-yellow-500 shrink-0 mr-3" />
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Your Name
              </label>
              <input
                type="text"
                id="input-name"
                value={booking.customerName}
                onChange={(e) => onChange({ customerName: e.target.value })}
                placeholder="Enter your full name"
                className="w-full bg-transparent border-0 p-0 text-zinc-800 text-sm font-semibold focus:ring-0 focus:outline-none placeholder-zinc-400 mt-0.5"
              />
            </div>
          </div>

          <div className="flex items-center glass-input rounded-xl px-3.5 py-3 focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400 transition-all">
            <Phone className="w-5 h-5 text-yellow-500 shrink-0 mr-3" />
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Mobile Number
              </label>
              <input
                type="tel"
                id="input-mobile"
                value={booking.customerMobile}
                onChange={(e) => onChange({ customerMobile: e.target.value })}
                placeholder="Enter 10-digit number"
                className="w-full bg-transparent border-0 p-0 text-zinc-800 text-sm font-semibold focus:ring-0 focus:outline-none placeholder-zinc-400 mt-0.5"
              />
            </div>
          </div>
        </div>

        {/* Pickup & Destination block with relative line */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[21px] top-8 bottom-8 w-[2px] border-l border-dashed border-zinc-300 pointer-events-none" />

          {/* Pickup Field */}
          <div ref={pickupRef} className="relative">
            <div className="flex items-center glass-input rounded-xl px-3.5 py-3 focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400 transition-all">
              <MapPin className="w-5 h-5 text-yellow-500 shrink-0 mr-3" />
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Pickup Hub / Location
                </label>
                <input
                  type="text"
                  id="input-pickup"
                  value={booking.pickup}
                  onChange={(e) => onChange({ pickup: e.target.value, pickupLatLng: null })}
                  onFocus={() => setPickupFocus(true)}
                  placeholder="Enter pickup address or hotel in Uttarkashi..."
                  className="w-full bg-transparent border-0 p-0 text-zinc-800 text-sm font-semibold focus:ring-0 focus:outline-none placeholder-zinc-400 mt-0.5"
                />
              </div>
              <button
                type="button"
                id="detect-location-btn"
                onClick={detectCurrentLocation}
                disabled={isDetecting}
                className="p-1.5 hover:bg-yellow-400/20 text-yellow-600 disabled:text-zinc-400 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0"
                title="Detect Current Location"
              >
                {isDetecting ? (
                  <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
                ) : (
                  <Navigation className="w-4 h-4 text-yellow-500" />
                )}
              </button>
            </div>

            {/* Suggestions dropdown */}
            <AnimatePresence>
              {pickupFocus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 mt-2 glass-premium border border-white/60 rounded-xl shadow-2xl z-20 overflow-hidden max-h-60 overflow-y-auto"
                >
                  <button
                    type="button"
                    id="gps-location-btn"
                    onClick={detectCurrentLocation}
                    disabled={isDetecting}
                    className="w-full px-4 py-3 text-left hover:bg-yellow-400/10 flex items-center gap-3 text-xs font-black text-yellow-600 border-b border-white/40 transition-colors"
                  >
                    {isDetecting ? (
                      <Loader2 className="w-4 h-4 text-yellow-500 shrink-0 animate-spin" />
                    ) : (
                      <Navigation className="w-4 h-4 text-yellow-500 shrink-0 animate-pulse" />
                    )}
                    <span>{isDetecting ? 'Detecting Location...' : 'Detect Current Location'}</span>
                  </button>
                  <div className="px-3.5 py-1.5 text-[10px] font-bold text-zinc-400 bg-white/20 tracking-wider">
                    POPULAR LOCATIONS
                  </div>
                  {popularDestinations.map((suggestion) => (
                    <button
                      key={suggestion.name}
                      type="button"
                      onClick={() => selectPickup(suggestion)}
                      className="w-full px-4 py-3 text-left hover:bg-yellow-400/10 border-b border-white/40 last:border-0 transition-colors flex flex-col"
                    >
                      <span className="text-xs font-bold text-zinc-800">{suggestion.name}</span>
                      <span className="text-[10px] text-zinc-500 truncate">{suggestion.description}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Swap Button */}
          <div className="absolute right-4 top-[50px] -translate-y-1/2 z-10">
            <button
              type="button"
              id="swap-btn"
              onClick={handleSwap}
              className="bg-white/80 hover:bg-white text-zinc-700 border border-zinc-250 hover:text-black p-2.5 rounded-full shadow-md transition-transform hover:rotate-180 duration-300 cursor-pointer flex items-center justify-center"
              title="Swap Locations"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Destination Field */}
          <div ref={destRef} className="relative mt-3">
            <div className="flex items-center glass-input rounded-xl px-3.5 py-3 focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400 transition-all">
              <MapPin className="w-5 h-5 text-zinc-400 shrink-0 mr-3" />
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Destination / Drop-off
                </label>
                <input
                  type="text"
                  id="input-destination"
                  value={booking.destination}
                  onChange={(e) => onChange({ destination: e.target.value, destinationLatLng: null })}
                  onFocus={() => setDestFocus(true)}
                  placeholder="Where do you want to explore?"
                  className="w-full bg-transparent border-0 p-0 text-zinc-800 text-sm font-semibold focus:ring-0 focus:outline-none placeholder-zinc-400 mt-0.5"
                />
              </div>
            </div>

            {/* Suggestions dropdown */}
            <AnimatePresence>
              {destFocus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 mt-2 glass-premium border border-white/60 rounded-xl shadow-2xl z-20 overflow-hidden max-h-60 overflow-y-auto"
                >
                  <div className="px-3.5 py-1.5 text-[10px] font-bold text-zinc-400 bg-white/20 tracking-wider">
                    POPULAR DESTINATIONS
                  </div>
                  {popularDestinations.map((suggestion) => (
                    <button
                      key={suggestion.name}
                      type="button"
                      onClick={() => selectDestination(suggestion)}
                      className="w-full px-4 py-3 text-left hover:bg-yellow-400/10 border-b border-white/40 last:border-0 transition-colors flex flex-col"
                    >
                      <span className="text-xs font-bold text-zinc-800">{suggestion.name}</span>
                      <span className="text-[10px] text-zinc-500 truncate">{suggestion.description}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Date & Time Selectors */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center glass-input rounded-xl px-3 py-2.5">
            <Calendar className="w-4 h-4 text-zinc-500 shrink-0 mr-2.5" />
            <div className="flex-1">
              <label className="block text-[8px] font-bold text-zinc-400 uppercase tracking-wider">
                Date
              </label>
              <input
                type="date"
                id="input-date"
                value={booking.date}
                onChange={(e) => onChange({ date: e.target.value })}
                className="w-full bg-transparent border-0 p-0 text-zinc-800 text-xs font-bold focus:ring-0 focus:outline-none mt-0.5"
              />
            </div>
          </div>

          <div className="flex items-center glass-input rounded-xl px-3 py-2.5">
            <Clock className="w-4 h-4 text-zinc-500 shrink-0 mr-2.5" />
            <div className="flex-1">
              <label className="block text-[8px] font-bold text-zinc-400 uppercase tracking-wider">
                Time
              </label>
              <input
                type="time"
                id="input-time"
                value={booking.time}
                onChange={(e) => onChange({ time: e.target.value })}
                className="w-full bg-transparent border-0 p-0 text-zinc-800 text-xs font-bold focus:ring-0 focus:outline-none mt-0.5"
              />
            </div>
          </div>
        </div>

        {/* Passengers / Rent Days Chooser */}
        <div className="flex items-center justify-between glass-input rounded-xl px-3.5 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/60 border border-white/40 flex items-center justify-center text-zinc-500 shadow-sm">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-black text-zinc-800">
                Rental Duration (Days)
              </span>
              <span className="block text-[10px] text-zinc-500 font-medium">
                Longer rental discount automatically applies
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              id="passenger-minus"
              onClick={() => onChange({ passengers: Math.max(1, booking.passengers - 1) })}
              className="w-8 h-8 rounded-lg bg-slate-200/60 hover:bg-slate-300/60 text-zinc-700 hover:text-black flex items-center justify-center font-black text-lg cursor-pointer transition-all"
            >
              -
            </button>
            <span className="text-sm font-black text-zinc-800 w-4 text-center">
              {booking.passengers}
            </span>
            <button
              type="button"
              id="passenger-plus"
              onClick={() => onChange({ passengers: Math.min(30, booking.passengers + 1) })}
              className="w-8 h-8 rounded-lg bg-slate-200/60 hover:bg-slate-300/60 text-zinc-700 hover:text-black flex items-center justify-center font-black text-lg cursor-pointer transition-all"
            >
              +
            </button>
          </div>
        </div>

        {/* Help banner for self-drive */}
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-800 rounded-xl p-3 flex gap-2.5 items-start text-[11px] leading-normal animate-fade-in shadow-sm">
          <Info className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold block text-amber-900">Self-Drive Policy Active</span>
            Includes 2 sanitized helmets, toolkits, and dynamic roadside assistance across Uttarakhand highways. Valid DL & Aadhaar required during pick-up.
          </div>
        </div>

        {/* Book Scooter Now button */}
        <button
          type="button"
          id="search-rides-btn"
          onClick={onSearch}
          className="w-full btn-yellow-premium py-4 px-4 rounded-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer mt-2 text-sm font-black uppercase tracking-wider shadow-lg shadow-yellow-500/15"
        >
          <span>Book Scooter Now</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}
