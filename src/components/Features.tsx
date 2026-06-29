import React from 'react';
import { 
  Shield, Sparkles, Navigation, CheckCircle2, UserCheck, Smartphone, 
  DollarSign, Star, Zap, Car, Bike, Compass, Heart, Calendar, MapPinCheck 
} from 'lucide-react';

export default function Features() {
  const services = [
    {
      icon: <Car className="w-6 h-6 text-yellow-600" />,
      title: 'Taxi Booking',
      description: 'On-demand mountain cabs with verified local drivers for safe travel around Uttarkashi.',
    },
    {
      icon: <Compass className="w-6 h-6 text-yellow-600" />,
      title: 'Airport Transfers',
      description: 'Guaranteed, reliable taxi connections between Jolly Grant Airport Dehradun and Uttarkashi.',
    },
    {
      icon: <Navigation className="w-6 h-6 text-yellow-600" />,
      title: 'Local City Rides',
      description: 'Quick rides connecting Joshiyara, Gyansu, Maneri Dam, and core Uttarkashi market zones.',
    },
    {
      icon: <MapPinCheck className="w-6 h-6 text-yellow-600" />,
      title: 'Outstation Trips',
      description: 'Dedicated multi-day long-distance tours for Gangotri, Yamunotri, Dehradun, and Rishikesh pilgrimages.',
    },
    {
      icon: <Bike className="w-6 h-6 text-yellow-600" />,
      title: 'Bike Rentals',
      description: 'Rent heavy-duty tourers like Royal Enfield Himalayan to ride across winding mountain roads.',
    },
    {
      icon: <Bike className="w-6 h-6 text-yellow-600" />,
      title: 'Scooter Rentals',
      description: 'Affordable self-drive Honda Activas starting at just ₹450/day. Perfect for solo travellers and couples.',
    },
  ];

  const whyChooseItems = [
    {
      icon: <DollarSign className="w-5 h-5 text-yellow-600" />,
      title: 'Affordable Pricing',
      description: 'Completely transparent flat rate charts. Zero tourist peak-pricing or hidden convenience charges.',
    },
    {
      icon: <UserCheck className="w-5 h-5 text-yellow-600" />,
      title: 'Professional Drivers',
      description: 'Native mountain captains trained in commercial hill driving and landslide safety protocols.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-yellow-600" />,
      title: 'Clean Vehicles',
      description: 'All self-drive scooters and cabs undergo rigorous weekly sanitization and mechanical checks.',
    },
    {
      icon: <Calendar className="w-5 h-5 text-yellow-600" />,
      title: 'Easy Booking',
      description: 'Dynamic and seamless online booking. Reserve your cab or motorbike in less than 30 seconds.',
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-600" />,
      title: 'Fast Pickup',
      description: 'Fleet points stationed strategically around Joshiyara Ward 08 ensuring pickups under 10 minutes.',
    },
    {
      icon: <Shield className="w-5 h-5 text-yellow-600" />,
      title: 'Safe & Reliable',
      description: 'Active GPS tracking, secure digital OTP handovers, and emergency SOS backup support.',
    },
    {
      icon: <Heart className="w-5 h-5 text-yellow-600" />,
      title: '24/7 Customer Support',
      description: 'Dedicated support helpline working day and night to assist tourists, pilgrims, and locals.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Choose Service',
      description: 'Select either a high-grade taxi or rent a self-drive two-wheeler from our mobile booking panel.',
    },
    {
      number: '02',
      title: 'Enter Route details',
      description: 'Input your pickup point and drop destination. You can choose from our popular list of pilgrimage hot spots.',
    },
    {
      number: '03',
      title: 'Confirm Booking',
      description: 'Verify the vehicle details, capacity limit, and estimated flat fare before clicking "Confirm".',
    },
    {
      number: '04',
      title: 'Enjoy Your Ride',
      description: 'Receive your secure OTP and enjoy a comfortable journey with active GPS safety tracking.',
    },
  ];

  const appFeatureItems = [
    {
      icon: <Navigation className="w-6 h-6 text-black" />,
      bg: 'bg-yellow-400 shadow-md',
      title: 'Live Hill Tracking',
      description: 'Share your live route coordinates with emergency contacts and monitor your journey real-time.',
    },
    {
      icon: <DollarSign className="w-6 h-6 text-yellow-600" />,
      bg: 'bg-white/80 border border-slate-200/50 shadow-sm',
      title: 'Cashless Payments',
      description: 'Pay securely using UPI (GPay, PhonePe, Paytm), cards, net banking, or direct cash with drivers.',
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      bg: 'bg-white/80 border border-slate-200/50 shadow-sm',
      title: 'Driver Ratings',
      description: 'Review your captain’s background and passenger pilgrim comments prior to stepping into the vehicle.',
    },
    {
      icon: <Shield className="w-6 h-6 text-black" />,
      bg: 'bg-yellow-400 ring-4 ring-yellow-400/20 shadow-lg animate-pulse',
      title: 'SOS Safety Alarm',
      description: 'An active single-tap emergency alarm that immediately alerts our Joshiyara desk for backup dispatch.',
    },
  ];

  return (
    <div id="features-container">
      {/* 1. SERVICES SECTION */}
      <section id="services-list" className="py-20 relative bg-zinc-900 text-white overflow-hidden">
        {/* Background ambient gold splash */}
        <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-yellow-400/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-yellow-400 uppercase">
              Premium Uttarakhand Services
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-2 text-white">
              Our Professional Mobility Offerings
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 mt-4 leading-relaxed font-semibold">
              From reliable local cabs to heavy-duty adventure tourer motorbikes, we have everything you need to navigate Uttarkashi's picturesque mountain slopes safely and comfortably.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <div 
                key={idx}
                className="bg-zinc-800/50 border border-zinc-700/50 hover:border-yellow-400/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0">
                  {svc.icon}
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
                    {svc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 relative bg-zinc-50 border-y border-zinc-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-yellow-600 uppercase">
              Seamless Travel Process
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight mt-2">
              How Urban Wheels Works
            </h2>
            <p className="text-xs md:text-sm text-zinc-500 mt-3 leading-relaxed font-semibold">
              Explore the Himalayas with a simple 4-step digital booking process. No calling broker agents or haggling over rates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Connector line for desktop */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-8 left-[70%] right-[-30%] h-[2px] bg-dashed bg-zinc-200 border-t border-dashed border-zinc-300 z-0" />
                )}
                
                <div className="relative z-10 glass-card border-white/60 shadow-md rounded-2xl p-6 hover:shadow-lg transition-all text-center">
                  <div className="w-14 h-14 rounded-full bg-yellow-400 text-black text-lg font-black flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform shadow-md shadow-yellow-400/10">
                    {step.number}
                  </div>
                  <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 mt-2.5 leading-relaxed font-semibold">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US SECTION */}
      <section id="why-choose-us" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-yellow-600 uppercase">
              What Makes Us Different
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight mt-2">
              Why Choose Urban Wheels
            </h2>
            <p className="text-sm text-zinc-600 mt-4 leading-relaxed font-medium">
              We are redefining Himalayan mobility by prioritizing professional safety, flat fixed rates, and sanitized self-drive motorbikes.
            </p>
          </div>

          {/* Why Choose Us Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {whyChooseItems.map((item, index) => (
              <div
                key={index}
                id={`why-choose-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="glass-card border-white/50 hover:border-zinc-300 rounded-2xl p-5 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/80 border border-slate-200 flex items-center justify-center mb-4 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-extrabold text-zinc-950 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 text-yellow-500" />
                  <span>Verified Feature</span>
                </div>
              </div>
            ))}
          </div>

          {/* Brand App Showcase Banner & App Features */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center glass-card border-white/60 shadow-xl rounded-3xl p-8 md:p-12">
            {/* Showcase left */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-black tracking-widest text-yellow-600 uppercase">
                Smart Tech Integration
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight">
                Safety and Speed in the Palm of Your Hand
              </h2>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed font-medium">
                Commute with ultimate peace of mind. Our state-of-the-art mobile application coordinates is fully equipped with tools to ensure you get active route guidance, offline SOS, and convenient UPI checkouts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <div className="glass-premium px-4 py-3 rounded-2xl border-white/50 shadow-sm flex items-center gap-3">
                  <div className="font-mono text-xl font-black text-yellow-600">0.4s</div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider leading-tight">
                    Average Match Speed
                  </div>
                </div>
                <div className="glass-premium px-4 py-3 rounded-2xl border-white/50 shadow-sm flex items-center gap-3">
                  <div className="font-mono text-xl font-black text-yellow-600">4.95★</div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider leading-tight">
                    Captain Rating Avg
                  </div>
                </div>
              </div>
            </div>

            {/* Features right */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {appFeatureItems.map((item, index) => (
                <div
                  key={index}
                  className="glass-card border-white/50 hover:border-zinc-300 transition-all rounded-2xl p-5 shadow-sm flex gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center ${item.bg}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-zinc-900 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
