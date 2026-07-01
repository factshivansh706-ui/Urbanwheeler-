import React from 'react';
import { Phone, Check, MessageSquare, Calendar, User, MapPin, Bike } from 'lucide-react';
import { ActiveRide, BookingState } from '../types';

interface ActiveRideStatusProps {
  activeRide: ActiveRide;
  booking: BookingState;
  onCancel: () => void;
}

export default function ActiveRideStatus({
  activeRide,
  booking,
  onCancel,
}: ActiveRideStatusProps) {
  // Calculate total rental price
  const getRentalPrice = (): number => {
    if (!activeRide.rideOption) return 800;
    return Math.round(activeRide.rideOption.basePrice * activeRide.passengers);
  };

  const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const waLink = `https://wa.me/917818971990?text=Namaste!%20I%20just%20placed%20a%20scooter%20booking%20(ID%3A%20${activeRide.id})%20on%20Urban%20Wheels%20for%20${booking.customerName}.%20Please%20confirm%20my%20booking%20for%20${booking.date}%20at%20${booking.time}.`;

  return (
    <div className="glass-card rounded-2xl p-6 shadow-2xl relative overflow-hidden border-white/60">
      {/* Visual background subtle green glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      
      {/* Confirmation Success Header */}
      <div className="text-center pb-6 border-b border-zinc-100">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-md border border-emerald-200 animate-bounce">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>
        <h3 className="text-2xl font-black text-zinc-900 tracking-tight">
          Booking Confirmed!
        </h3>
        <p className="text-xs text-zinc-500 mt-1 font-semibold">
          Your reservation has been received.
        </p>
      </div>

      {/* Booking Details Grid */}
      <div className="py-5 space-y-4">
        <div className="flex justify-between items-center bg-slate-100/50 p-2.5 rounded-xl border border-zinc-200/40">
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">
            Booking ID
          </span>
          <span className="font-mono text-xs font-black bg-yellow-400/25 text-yellow-800 px-3 py-1 rounded-lg border border-yellow-400/30">
            {activeRide.id}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 text-xs leading-relaxed">
          {/* Customer Name */}
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
            <span className="text-zinc-500 font-bold flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-zinc-400" />
              <span>Customer Name</span>
            </span>
            <span className="font-extrabold text-zinc-800">{booking.customerName}</span>
          </div>

          {/* Customer Mobile */}
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
            <span className="text-zinc-500 font-bold flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span>Mobile Number</span>
            </span>
            <span className="font-extrabold text-zinc-800">{booking.customerMobile}</span>
          </div>

          {/* Scooter Model */}
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
            <span className="text-zinc-500 font-bold flex items-center gap-1.5">
              <Bike className="w-3.5 h-3.5 text-zinc-400" />
              <span>Scooter Model</span>
            </span>
            <span className="font-extrabold text-zinc-800">{activeRide.rideOption?.name || 'Honda Activa 6G'}</span>
          </div>

          {/* Rental Price */}
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
            <span className="text-zinc-500 font-bold flex items-center gap-1.5">
              <span className="text-zinc-400 font-black">₹</span>
              <span>Total Price</span>
            </span>
            <span className="font-black text-sm text-yellow-600">
              ₹{getRentalPrice()}
              <span className="text-[10px] text-zinc-500 font-semibold"> / {activeRide.passengers} Days</span>
            </span>
          </div>

          {/* Pickup Location */}
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
            <span className="text-zinc-500 font-bold flex items-center gap-1.5 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>Pickup Hub</span>
            </span>
            <span className="font-extrabold text-zinc-800 truncate max-w-[200px] text-right" title={activeRide.pickup}>
              {activeRide.pickup}
            </span>
          </div>

          {/* Booking Date & Time */}
          <div className="flex items-center justify-between pb-1">
            <span className="text-zinc-500 font-bold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>Date & Time</span>
            </span>
            <span className="font-extrabold text-zinc-800 text-right">
              {formattedDate} at {booking.time}
            </span>
          </div>
        </div>
      </div>

      {/* Call to Action Message */}
      <div className="bg-emerald-50 border border-emerald-200/50 rounded-xl p-3.5 text-center text-xs leading-normal mb-6 text-emerald-800 shadow-inner">
        <span className="font-black block text-emerald-900 mb-1">ACTION REQUIRED</span>
        Thank you for your booking. Please call or WhatsApp us to confirm your booking and collect your scooter.
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Call Now Button */}
        <a
          href="tel:+917818971990"
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold flex items-center justify-center gap-2 py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 transition-all uppercase tracking-wider text-xs cursor-pointer text-center"
        >
          <Phone className="w-4 h-4 stroke-[3.5]" />
          <span>Call Now (+91 7818971990)</span>
        </a>

        {/* WhatsApp Now Button */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-green-500 hover:bg-green-400 text-white font-extrabold flex items-center justify-center gap-2 py-3.5 rounded-xl shadow-md border border-green-600/20 transition-all uppercase tracking-wider text-xs cursor-pointer text-center"
        >
          <MessageSquare className="w-4 h-4 fill-white text-green-500" />
          <span>WhatsApp Now</span>
        </a>

        {/* Reset / Book another ride button */}
        <button
          type="button"
          onClick={onCancel}
          className="w-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 py-2.5 rounded-xl transition-all text-xs font-bold uppercase tracking-wider cursor-pointer border border-transparent"
        >
          Book Another Scooter
        </button>
      </div>
    </div>
  );
}
