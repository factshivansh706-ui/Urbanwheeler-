import React from 'react';
import { Bike, Flame, Users, Clock, Leaf, ShieldCheck, CreditCard, Check, Sparkles } from 'lucide-react';
import { RideOption, BookingState } from '../types';
import { rideOptions } from '../data';
import { motion } from 'motion/react';

interface RideSelectorProps {
  booking: BookingState;
  selectedRideId: string | null;
  onSelect: (id: string) => void;
  onConfirm: () => void;
}

export default function RideSelector({
  booking,
  selectedRideId,
  onSelect,
  onConfirm,
}: RideSelectorProps) {
  // Duration of rental in days (using booking.passengers as days)
  const durationDays = booking.passengers || 1;

  return (
    <div id="fleet" className="glass-card rounded-2xl p-5 md:p-6 shadow-2xl mt-6 border-white/60 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-xs font-black tracking-widest text-yellow-600 uppercase flex items-center gap-1">
            <Sparkles className="w-3 h-3 fill-yellow-500 text-yellow-500 animate-pulse" />
            <span>Exclusive Ride Options</span>
          </span>
          <h3 className="text-xl font-black text-zinc-900 tracking-tight mt-0.5">
            Honda Activa 125 Rental Plans
          </h3>
          <p className="text-xs text-zinc-500 mt-1 font-semibold">
            Duration: <span className="font-bold text-zinc-800">{durationDays} {durationDays === 1 ? 'Day' : 'Days'}</span> self-drive exploration
          </p>
        </div>

        <div className="flex items-center gap-2 glass-input rounded-xl px-3.5 py-2 text-xs text-zinc-600 border-white/50">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>No extra hidden fees. Dual sanitized helmets included.</span>
        </div>
      </div>

      {/* Two Premium Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {rideOptions.map((option) => {
          const isSelected = selectedRideId === option.id;
          const dailyRate = option.basePrice;
          const totalCost = dailyRate * durationDays;

          const isSpecial = option.id === 'activa_24h_special';

          return (
            <div
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`relative rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 ${
                isSelected
                  ? 'border-yellow-400 bg-yellow-400/10 ring-2 ring-yellow-400/20 shadow-xl cursor-pointer scale-[1.01]'
                  : 'border-white/50 hover:border-zinc-300 bg-white/40 hover:bg-white/60 hover:shadow-md cursor-pointer'
              }`}
            >
              {/* Badges */}
              <div className="absolute top-4 right-4 flex gap-1.5 items-center">
                {isSpecial && (
                  <span className="bg-yellow-400 text-black text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider uppercase flex items-center gap-0.5 shadow-sm">
                    <Flame className="w-2.5 h-2.5 fill-black" />
                    <span>Best Value</span>
                  </span>
                )}
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <Leaf className="w-2.5 h-2.5" />
                  <span>Self-Drive</span>
                </span>
              </div>

              {/* Ride info header */}
              <div>
                <div className="flex gap-3.5 items-start">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${isSelected ? 'bg-yellow-400 text-black' : 'bg-white/80 border border-slate-200/50 text-zinc-500'}`}>
                    <Bike className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-zinc-900">
                      {option.name}
                    </h4>
                    <p className="text-[11px] text-zinc-500 leading-normal mt-1 pr-14">
                      {option.description}
                    </p>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span>Premium Honda Activa 125 CC Engine</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span>2 Sanitized Helmets Included</span>
                  </div>
                  {isSpecial ? (
                    <>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                        <span>24 Hours Full Flexibility (Overnight)</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                        <span>Free Roadside Assistance across Uttarkashi</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                        <span>Daytime Exploration (Return by 8 PM)</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                        <span>Perfect for local temple & ghat visits</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Price & selection footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="block text-[8px] font-black tracking-widest text-zinc-400 uppercase leading-none">
                    Plan Price
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-black text-zinc-900">₹{dailyRate}</span>
                    <span className="text-[10px] text-zinc-500 font-semibold">/ day</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-[8px] font-black tracking-widest text-zinc-400 uppercase leading-none">
                    Total Cost ({durationDays} {durationDays === 1 ? 'Day' : 'Days'})
                  </span>
                  <span className="text-base font-black text-zinc-900 mt-1 block">
                    ₹{totalCost}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Button Footer */}
      {selectedRideId && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-xl bg-zinc-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border border-zinc-800"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-bold shrink-0 shadow-sm">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-black text-yellow-400 uppercase tracking-widest">
                No Prepayment Required
              </span>
              <span className="text-xs font-bold text-zinc-300">
                Zero security deposit online! Pay only when collecting your Honda Activa 125.
              </span>
            </div>
          </div>

          <button
            id="confirm-booking-btn"
            onClick={onConfirm}
            className="w-full sm:w-auto btn-yellow-premium px-8 py-3 rounded-xl shadow-lg transition-all text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Confirm Booking Now</span>
            <span>→</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
