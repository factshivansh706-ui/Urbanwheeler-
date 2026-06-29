import React, { useEffect, useState } from 'react';
import { Phone, MessageSquare, ShieldAlert, X, ShieldCheck, Zap, Star, Sparkles, Check, Bike, Car } from 'lucide-react';
import { ActiveRide } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ActiveRideStatusProps {
  activeRide: ActiveRide;
  onUpdate: (updates: Partial<ActiveRide>) => void;
  onCancel: () => void;
}

const DRIVER_POOL = {
  name: 'Sanjay Negi',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  rating: 4.95,
  trips: 1820,
  phone: '+91 78189 71990',
  vehicles: {
    bike_rental: 'Royal Enfield Himalayan (Slate Grey)',
    scooter_rental: 'Honda Activa 6G (Sunshine Yellow)',
    taxi_local: 'Local Maruti Alto 800 (White)',
    taxi_sedan: 'Comfort Maruti Dzire (Silver)',
    taxi_suv: 'Mahindra Bolero Power+ 4x4 (White)',
    outstation: 'Himalayan Tourist Innova Crysta',
  },
  plates: {
    bike_rental: 'UK-09-A-8821',
    scooter_rental: 'UK-09-S-5520',
    taxi_local: 'UK-07-TA-1422',
    taxi_sedan: 'UK-07-TA-8920',
    taxi_suv: 'UK-09-TA-7818',
    outstation: 'UK-07-TD-9910',
  }
};

export default function ActiveRideStatus({
  activeRide,
  onUpdate,
  onCancel,
}: ActiveRideStatusProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'driver' | 'user'; text: string; time: string }>>([
    { sender: 'driver', text: 'Pranam! I am Sanjay Negi. I am preparing your vehicle at our Joshiyara Central Hub. Please share the secure OTP upon handover.', time: 'Just now' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [sosTriggered, setSosTriggered] = useState(false);

  const isRental = activeRide.rideOption?.category === 'rental';

  // Dynamic receipt fare computation
  const getCompletedFare = (): number => {
    if (!activeRide.rideOption) return 250;
    if (activeRide.rideOption.category === 'rental') {
      return activeRide.rideOption.basePrice * activeRide.passengers;
    } else {
      const distance = activeRide.pickup.toLowerCase().includes('gangotri') || activeRide.destination.toLowerCase().includes('gangotri') ? 100.5 : 3.5;
      const perKmPrice = activeRide.rideOption.pricePerKm || 15;
      return Math.round(activeRide.rideOption.basePrice + (distance * perKmPrice));
    }
  };

  // Auto-matching & Arrival Simulation Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (activeRide.status === 'searching') {
      // 1. Simulate Searching: Match a driver/hub representative after 3.5 seconds
      interval = setTimeout(() => {
        const optionType = activeRide.rideOption?.type || 'taxi_local';
        const vehicleName = DRIVER_POOL.vehicles[optionType as keyof typeof DRIVER_POOL.vehicles] || DRIVER_POOL.vehicles.taxi_local;
        const plateNumber = DRIVER_POOL.plates[optionType as keyof typeof DRIVER_POOL.plates] || DRIVER_POOL.plates.taxi_local;

        onUpdate({
          status: 'assigned',
          driver: {
            name: isRental ? 'Devendra Rawat (Hub Handoff)' : DRIVER_POOL.name,
            avatar: isRental ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' : DRIVER_POOL.avatar,
            rating: DRIVER_POOL.rating,
            trips: DRIVER_POOL.trips,
            phone: DRIVER_POOL.phone,
            vehicle: vehicleName,
            plate: plateNumber,
          },
          otp: Math.floor(1000 + Math.random() * 9000).toString(),
          progress: 0,
        });
      }, 3500);

    } else if (activeRide.status === 'assigned') {
      // 2. Simulate Driver Arriving: Update progress up to 100% over 8 seconds
      interval = setInterval(() => {
        if (activeRide.progress < 100) {
          onUpdate({ progress: activeRide.progress + 12.5 });
        } else {
          // Reached pickup location! Transition to arriving/ongoing
          onUpdate({ status: 'arriving' });
        }
      }, 1000);

    } else if (activeRide.status === 'arriving') {
      // 3. Driver waiting at pickup. Wait 3.5 seconds, then auto-start trip!
      interval = setTimeout(() => {
        onUpdate({ status: 'ongoing', progress: 0 });
        setMessages((prev) => [
          ...prev,
          { 
            sender: 'driver', 
            text: isRental 
              ? 'Handover paperwork completed! Enjoy your self-drive ride across Uttarkashi. Ride safely!' 
              : 'Secure OTP verified. Trip started. Driving carefully across the mountain roads!', 
            time: 'Just now' 
          }
        ]);
      }, 3500);

    } else if (activeRide.status === 'ongoing') {
      // 4. Simulate Trip Transit: progress from 0% to 100% over 12 seconds
      interval = setInterval(() => {
        if (activeRide.progress < 100) {
          onUpdate({ progress: activeRide.progress + 10 });
        } else {
          // Arrived!
          onUpdate({ status: 'completed' });
        }
      }, 1200);
    }

    return () => {
      clearTimeout(interval);
      clearInterval(interval);
    };
  }, [activeRide.status, activeRide.progress, activeRide.rideOption]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: chatInput, time: 'Just now' }]);
    const userText = chatInput;
    setChatInput('');

    // Simulated driver reply
    setTimeout(() => {
      let reply = "Namaste! Noted, keeping vehicle warm and ready.";
      if (userText.toLowerCase().includes('where') || userText.toLowerCase().includes('reach')) {
        reply = isRental 
          ? "I am waiting at Santri's CSC Hub, Ward No. 8, Joshiyara with keys and helmets." 
          : "Passing the Bhagirathi River bridge, arriving in 2 minutes.";
      } else if (userText.toLowerCase().includes('otp')) {
        reply = "Yes, please share the OTP when we meet to unlock the vehicle.";
      } else if (userText.toLowerCase().includes('helmet')) {
        reply = "Absolutely, two high-quality sanitized helmets are fully secured under the seat.";
      }
      setMessages((prev) => [...prev, { sender: 'driver', text: reply, time: 'Just now' }]);
    }, 1500);
  };

  const triggerSOS = () => {
    setSosTriggered(true);
    // Auto reset after 5s
    setTimeout(() => {
      setSosTriggered(false);
    }, 5000);
  };

  return (
    <div className="glass-card rounded-2xl p-5 shadow-2xl relative overflow-hidden border-white/60">
      
      {/* Red Ambient Pulse underlay if SOS is active */}
      <AnimatePresence>
        {sosTriggered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-950/95 z-20 border-2 border-red-500 pointer-events-none flex flex-col items-center justify-center text-center p-6 animate-pulse"
          >
            <ShieldAlert className="w-16 h-16 text-red-400 animate-bounce mb-3" />
            <h4 className="text-lg font-black text-red-400">SOS SECURITY RESPONSE ACTIVE</h4>
            <p className="text-xs text-zinc-200 max-w-sm mt-1 leading-relaxed">
              Our central Joshiyara Support Desk has registered your emergency. An offline backup vehicle and mountain patrol team have been dispatched. Local emergency services have been alerted.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER: Dynamic Progress/Status Banner */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="text-[10px] font-black tracking-widest text-yellow-600 uppercase">
            Live Booking Status
          </span>
          <h3 className="text-base font-black text-zinc-900 tracking-tight flex items-center gap-2 mt-0.5">
            {activeRide.status === 'searching' && (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping" />
                <span>Matching with Nearby Fleet...</span>
              </>
            )}
            {activeRide.status === 'assigned' && (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>{isRental ? 'Rental Approved! Preparing vehicle' : 'Taxi Driver Found! Arriving'}</span>
              </>
            )}
            {activeRide.status === 'arriving' && (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
                <span>{isRental ? 'Ready at Joshiyara Hub' : 'Driver is at Your Doorstep!'}</span>
              </>
            )}
            {activeRide.status === 'ongoing' && (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>{isRental ? 'Self-Drive In Progress' : 'In Transit • Mountain Mode'}</span>
              </>
            )}
            {activeRide.status === 'completed' && (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>{isRental ? 'Rental Cycle Completed!' : 'Arrived at Destination!'}</span>
              </>
            )}
          </h3>
        </div>

        {/* Cancel button - only before transit */}
        {(activeRide.status === 'searching' || activeRide.status === 'assigned') && (
          <button
            id="cancel-active-ride"
            onClick={onCancel}
            className="text-zinc-400 hover:text-zinc-800 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Cancel Ride"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* RIDE ACTIVE PHASES */}
      {activeRide.status === 'searching' ? (
        /* PHASE 1: SEARCHING RADAR */
        <div className="py-10 flex flex-col items-center justify-center text-center space-y-5">
          <div className="relative">
            {/* Pulsing visual circles */}
            <div className="w-20 h-20 rounded-full border border-yellow-400/40 flex items-center justify-center relative">
              <div className="absolute inset-0 w-full h-full rounded-full border border-yellow-400/30 animate-ping scale-125" />
              <Zap className="w-8 h-8 text-yellow-500 fill-yellow-400/10" />
            </div>
          </div>
          <div>
            <span className="text-xs text-zinc-500 block max-w-xs mx-auto font-medium">
              Checking vehicle mechanics, tire quality, and optimizing native captain routes for a flawless mountain ride.
            </span>
          </div>
        </div>
      ) : activeRide.status === 'completed' ? (
        /* PHASE 5: TRIP COMPLETED RECEIPT */
        <div className="space-y-5">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2 shadow-sm">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h4 className="text-sm font-black text-emerald-800">
              {isRental ? 'Two-Wheeler Rental Complete!' : 'Taxi Ride Completed successfully!'}
            </h4>
            <p className="text-xs text-emerald-600 mt-0.5">Thank you for riding with Urban Wheels Uttarkashi.</p>
          </div>

          {/* Receipt Info */}
          <div className="glass-input rounded-xl border border-white/50 p-4 space-y-2.5 text-xs shadow-inner">
            <div className="flex justify-between border-b border-slate-200/50 pb-2">
              <span className="text-zinc-500 font-bold">Vehicle Class</span>
              <span className="font-extrabold text-zinc-800">{activeRide.rideOption?.name}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/50 pb-2">
              <span className="text-zinc-500 font-bold">Pickup Landmark</span>
              <span className="font-extrabold text-zinc-800 truncate max-w-[180px]">{activeRide.pickup}</span>
            </div>
            {activeRide.destination && (
              <div className="flex justify-between border-b border-slate-200/50 pb-2">
                <span className="text-zinc-500 font-bold">Destination Drop</span>
                <span className="font-extrabold text-zinc-800 truncate max-w-[180px]">{activeRide.destination}</span>
              </div>
            )}
            <div className="flex justify-between pt-1">
              <span className="text-zinc-600 font-extrabold">
                {isRental ? `Total Rental Price (${activeRide.passengers} Days)` : 'Estimated Total Fare'}
              </span>
              <span className="font-black text-sm text-yellow-600">
                ₹{getCompletedFare()}
              </span>
            </div>
          </div>

          <button
            id="book-another-ride-btn"
            onClick={onCancel}
            className="w-full btn-yellow-premium py-3 rounded-xl transition-all text-xs uppercase tracking-wider cursor-pointer font-bold"
          >
            Plan Another Commute
          </button>
        </div>
      ) : (
        /* PHASES 2, 3, 4: ASSIGNED / ARRIVED / ONGOING */
        <div className="space-y-4">
          
          {/* Driver Card */}
          {activeRide.driver && (
            <div className="glass-input border border-white/50 rounded-xl p-4 shadow-inner">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={activeRide.driver.avatar}
                    alt={activeRide.driver.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-sm"
                  />
                  <div>
                    <h4 className="text-xs font-black text-zinc-900">{activeRide.driver.name}</h4>
                    
                    {/* Rating & trips count */}
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 mt-0.5 font-semibold">
                      <span className="flex items-center text-yellow-600">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span className="font-black ml-0.5">{activeRide.driver.rating}</span>
                      </span>
                      <span>•</span>
                      <span>Mountain Certified</span>
                    </div>
                  </div>
                </div>

                {/* Right block: Secure OTP */}
                <div className="text-right">
                  <span className="block text-[8px] font-black text-zinc-400 tracking-wider uppercase">
                    Secure OTP
                  </span>
                  <span className="inline-block bg-yellow-400 text-black px-2.5 py-1 rounded-lg font-mono text-xs font-black mt-1 leading-tight tracking-wider shadow-sm">
                    {activeRide.otp}
                  </span>
                </div>
              </div>

              {/* Vehicle / License Plate layout */}
              <div className="mt-4 pt-3.5 border-t border-slate-200/50 flex items-center justify-between">
                <div>
                  <span className="block text-[8px] font-bold text-zinc-400 uppercase tracking-wider">
                    Assigned Vehicle
                  </span>
                  <span className="text-xs font-black text-zinc-800">
                    {activeRide.driver.vehicle}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-[8px] font-bold text-zinc-400 uppercase tracking-wider">
                    Registration Plate
                  </span>
                  <span className="inline-block bg-slate-200 border border-zinc-300 text-zinc-800 px-2.5 py-0.5 rounded-lg font-mono text-xs font-black mt-0.5 shadow-sm">
                    {activeRide.driver.plate}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE PROGRESS BAR */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-zinc-500 font-extrabold">
              <span>
                {activeRide.status === 'assigned' && (isRental ? 'Preparing rental handover' : 'Driver approaching pickup')}
                {activeRide.status === 'arriving' && (isRental ? 'Ready for pick-up' : 'Driver is at pickup point')}
                {activeRide.status === 'ongoing' && (isRental ? 'Self-drive tour active' : 'Traveling safely in mountains')}
              </span>
              <span className="text-yellow-600 font-extrabold">
                {activeRide.status === 'assigned' && `Ready in ${Math.max(1, Math.round(5 - (activeRide.progress / 20)))} mins`}
                {activeRide.status === 'arriving' && 'Verified! Please share OTP'}
                {activeRide.status === 'ongoing' && `${100 - activeRide.progress}% journey left`}
              </span>
            </div>
            
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden border border-white/50">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-1000 shadow-sm"
                style={{ width: `${activeRide.progress}%` }}
              />
            </div>
          </div>

          {/* ACTIONS: Calling, chat support, security SOS */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => alert(`Dialing Support Captain Devendra on ${activeRide.driver?.phone}...`)}
              className="bg-white/70 hover:bg-white border border-white/80 py-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm group"
            >
              <Phone size={16} className="text-zinc-500 group-hover:text-yellow-600 transition-colors" />
              <span className="text-[10px] font-bold text-zinc-500">{isRental ? 'Call Hub Desk' : 'Call Captain'}</span>
            </button>

            <button
              onClick={() => setChatOpen(!chatOpen)}
              className={`border py-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                chatOpen
                  ? 'bg-yellow-400 border-yellow-400 text-black'
                  : 'bg-white/70 hover:bg-white border-white/80 text-zinc-500'
              }`}
            >
              <MessageSquare size={16} className={chatOpen ? 'text-black' : 'text-zinc-500'} />
              <span className={`text-[10px] font-bold ${chatOpen ? 'text-black' : 'text-zinc-500'}`}>
                {chatOpen ? 'Close Chat' : 'Chat (1)'}
              </span>
            </button>

            <button
              onClick={triggerSOS}
              className="bg-red-50 hover:bg-red-100 border border-red-200 py-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer group animate-pulse"
            >
              <ShieldAlert size={16} className="text-red-500 group-hover:text-red-600" />
              <span className="text-[10px] font-bold text-red-500">SOS Trigger</span>
            </button>
          </div>

          {/* Chat Window Draw-In */}
          <AnimatePresence>
            {chatOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-slate-200/50 pt-3 space-y-3"
              >
                <div className="glass-premium rounded-xl border border-white/50 p-3 max-h-40 overflow-y-auto space-y-2.5 shadow-inner">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col max-w-[85%] ${
                        msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                      }`}
                    >
                      <div
                        className={`p-2.5 rounded-xl text-xs shadow-sm ${
                          msg.sender === 'user'
                            ? 'bg-yellow-400 text-black font-semibold rounded-tr-none'
                            : 'bg-white/80 text-zinc-800 border border-white/40 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-zinc-400 mt-0.5 font-bold uppercase tracking-wider">
                        {msg.time}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type message for Captain..."
                    className="flex-1 glass-input border border-white/50 rounded-xl px-3 text-xs text-zinc-800 focus:outline-none focus:border-yellow-400 placeholder-zinc-400"
                  />
                  <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold px-3.5 rounded-xl text-xs cursor-pointer shadow"
                  >
                    Send
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}

    </div>
  );
}
