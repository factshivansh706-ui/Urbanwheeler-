import React from 'react';
import { Bike, Car, Flame, Users, Clock, Leaf, ShieldCheck, CreditCard, Calendar } from 'lucide-react';
import { RideOption, BookingState } from '../types';
import { rideOptions } from '../data';
import { motion } from 'motion/react';

interface RideSelectorProps {
  booking: BookingState;
  selectedRideId: string | null;
  onSelect: (id: string) => void;
  onConfirm: () => void;
}

// Distance computation helpers based on local Uttarkashi landmarks
const calculateDistanceKm = (pickup: string, destination: string): number => {
  if (!pickup || !destination) return 2.5; // default fallback
  if (pickup === destination) return 1.5;

  const names = [pickup.toLowerCase(), destination.toLowerCase()];
  
  // Gangotri Temple (long distance pilgrims)
  if (names.some(n => n.includes('gangotri'))) {
    return 100.5;
  }
  
  // Dehradun Jolly Grant Airport
  if (names.some(n => n.includes('jolly grant') || n.includes('airport'))) {
    return 172.0;
  }

  // Chinyalisaur
  if (names.some(n => n.includes('chinyalisaur') || n.includes('helipad'))) {
    return 34.8;
  }

  // Maneri Dam
  if (names.some(n => n.includes('maneri'))) {
    return 14.5;
  }

  // Kashi Vishwanath Temple
  if (names.some(n => n.includes('kashi') || n.includes('vishwanath'))) {
    return 2.2;
  }

  return 3.5; // default avg city ride
};

export default function RideSelector({
  booking,
  selectedRideId,
  onSelect,
  onConfirm,
}: RideSelectorProps) {
  const distance = calculateDistanceKm(booking.pickup, booking.destination);
  const isOutstation = distance > 40;

  // Calculate estimated duration based on mountain average speeds (approx 30km/h in hills + buffer)
  const estDurationMinutes = Math.round(distance * 2.0 + (isOutstation ? 35 : 5));

  // Calculate dynamic fare
  const getEstimatedFare = (option: RideOption): number => {
    if (option.category === 'rental') {
      // Rental daily rate multiplied by duration (booking.passengers tracks days in rental mode)
      return Math.round(option.basePrice * booking.passengers);
    } else {
      // Taxi option
      const perKmPrice = option.pricePerKm || 15;
      let fare = option.basePrice + (distance * perKmPrice);
      
      // Dynamic adjustments for remote high mountain roads
      if (distance > 80) {
        fare *= 0.95; // volume discount for long distance pilgrimages
      }
      return Math.round(fare);
    }
  };

  // Get icon based on ride type
  const getRideIcon = (type: string, size = 24) => {
    switch (type) {
      case 'bike_rental':
        return <Bike className="text-yellow-600 animate-pulse" size={size} />;
      case 'scooter_rental':
        return <Bike className="text-zinc-600" size={size} />;
      case 'taxi_local':
        return <Car className="text-zinc-500" size={size} />;
      case 'taxi_sedan':
        return <Car className="text-yellow-600" size={size} />;
      case 'taxi_suv':
        return <Car className="text-zinc-800" size={size} />;
      case 'outstation':
        return (
          <div className="relative flex items-center">
            <Car className="text-yellow-600" size={size} />
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[7px] font-extrabold px-1 rounded-full">
              TOUR
            </span>
          </div>
        );
      default:
        return <Car className="text-zinc-500" size={size} />;
    }
  };

  // Filter fleet based on booking's active service type
  const filteredOptions = rideOptions.filter(o => o.category === booking.serviceType);

  return (
    <div id="fleet" className="glass-card rounded-2xl p-5 md:p-6 shadow-2xl mt-6 border-white/60 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-xs font-black tracking-widest text-yellow-600 uppercase">
            Available {booking.serviceType === 'rental' ? 'Two-Wheeler Fleet' : 'Taxi Cabs'}
          </span>
          <h3 className="text-xl font-black text-zinc-900 tracking-tight mt-0.5">
            {booking.serviceType === 'rental' 
              ? 'Select Your Rental Bike / Scooter' 
              : 'Choose Your Himalayan Cab Comfort'}
          </h3>
          <p className="text-xs text-zinc-500 mt-1 font-semibold">
            {booking.serviceType === 'rental' ? (
              <span>Duration: <span className="font-bold text-zinc-800">{booking.passengers} Days</span> self-drive tour</span>
            ) : (
              <span>Distance: <span className="font-bold text-zinc-800">{distance.toFixed(1)} km</span> • Est. Travel Time: <span className="font-bold text-zinc-800">{estDurationMinutes} mins</span></span>
            )}
          </p>
        </div>

        {/* Info label about price transparency */}
        <div className="hidden sm:flex items-center gap-2 glass-input rounded-xl px-3.5 py-2 text-xs text-zinc-600 border-white/50">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Transparent rates. Zero mountain peak pricing.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOptions.map((option) => {
          const isSelected = selectedRideId === option.id;
          const fare = getEstimatedFare(option);

          return (
            <div
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`relative rounded-xl border p-4 flex flex-col justify-between transition-all duration-300 ${
                isSelected
                  ? 'border-yellow-400 bg-yellow-400/15 ring-2 ring-yellow-400/20 shadow-md shadow-yellow-400/5 cursor-pointer'
                  : 'border-white/40 hover:border-zinc-300 bg-white/40 hover:shadow-sm cursor-pointer'
              }`}
            >
              {/* Badges */}
              <div className="absolute top-3 right-3 flex gap-1.5 items-center">
                {option.popular && (
                  <span className="bg-yellow-400 text-black text-[9px] font-black px-2 py-0.5 rounded-full tracking-wide uppercase flex items-center gap-0.5">
                    <Flame className="w-2.5 h-2.5 fill-black" />
                    <span>Highly Rated</span>
                  </span>
                )}
                {option.category === 'rental' && (
                  <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <Leaf className="w-2.5 h-2.5" />
                    <span>Self-Drive</span>
                  </span>
                )}
              </div>

              {/* Ride info header */}
              <div className="flex gap-3.5 items-start">
                <div className="w-12 h-12 rounded-xl bg-white/80 border border-slate-200/50 flex items-center justify-center shrink-0 shadow-sm">
                  {getRideIcon(option.type, 26)}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-zinc-900 flex items-center gap-1.5">
                    {option.name}
                  </h4>
                  <p className="text-[11px] text-zinc-500 leading-normal mt-0.5 max-w-[150px] sm:max-w-none">
                    {option.description}
                  </p>
                </div>
              </div>

              {/* Passenger and Time indicators */}
              <div className="flex items-center gap-3.5 text-[10px] text-zinc-500 font-bold tracking-wider mt-4 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Max {option.capacity} {option.category === 'rental' ? 'Riders' : 'Passengers'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{option.category === 'rental' ? 'Instantly Ready' : `Pickup in ${option.etaMinutes} mins`}</span>
                </span>
              </div>

              {/* Price footer */}
              <div className="flex items-end justify-between mt-4">
                <div>
                  <span className="block text-[8px] font-black tracking-widest text-zinc-400 uppercase">
                    {option.category === 'rental' ? 'Total Rental Cost' : 'Estimated Base Fare'}
                  </span>
                  <span className="text-lg font-black text-zinc-900">
                    ₹{fare}
                    {option.category === 'rental' && <span className="text-[10px] font-semibold text-zinc-500"> / {booking.passengers} Days</span>}
                  </span>
                </div>

                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-yellow-400 border-yellow-400 text-black shadow'
                    : 'border-zinc-300 bg-transparent'
                }`}>
                  {isSelected && <span className="text-[10px] font-black">✓</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Overlay Trigger Card */}
      {selectedRideId && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-xl glass-input border border-white/60 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600 border border-yellow-200 shrink-0 shadow-sm">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                Payment Selection
              </span>
              <span className="text-xs font-bold text-zinc-600">
                {booking.serviceType === 'rental' 
                  ? 'Self-Drive Security Deposit: ₹1,000 (Fully Refundable)' 
                  : 'Cashless Ride Booking • Pay after journey ends'}
              </span>
            </div>
          </div>

          <button
            id="confirm-booking-btn"
            onClick={onConfirm}
            className="w-full sm:w-auto btn-yellow-premium px-6 py-3 rounded-xl shadow-lg transition-all text-sm tracking-tight flex items-center justify-center gap-1.5 cursor-pointer uppercase"
          >
            <span>Confirm {booking.serviceType === 'rental' ? 'Rental Booking' : 'Taxi Ride'}</span>
            <span>→</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
