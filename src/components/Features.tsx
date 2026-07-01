import React from 'react';
import { 
  Shield, Sparkles, Navigation, CheckCircle2, UserCheck, Smartphone, 
  DollarSign, Star, Zap, Car, Bike, Compass, Heart, Calendar, MapPinCheck 
} from 'lucide-react';

export default function Features() {
  const services = [
    {
      icon: <Bike className="w-6 h-6 text-yellow-600" />,
      title: 'Scooty Rental',
      description: 'Affordable self-drive Honda Activas starting at just ₹800/day. Lightweight, reliable, and perfect for solo travelers, couples, and local commutes.',
    },
    {
      icon: <Bike className="w-6 h-6 text-yellow-600" />,
      title: 'Bike Rental',
      description: 'Rent premium adventure motorbikes like the Royal Enfield Himalayan to comfortably ride across Uttarkashi’s high mountain roads.',
    },
    {
      icon: <Shield className="w-6 h-6 text-yellow-600" />,
      title: 'Helmet Included',
      description: 'We prioritize your safety. Every rental comes with sanitized, certified high-quality helmets and required tools at no extra charge.',
    },
    {
      icon: <Heart className="w-6 h-6 text-yellow-600" />,
      title: '24/7 Support',
      description: 'Enjoy roadside breakdown assistance, local helpline backup, and instant support wherever you ride across Uttarakhand.',
    },
  ];

  const whyChooseItems = [
    {
      icon: <DollarSign className="w-5 h-5 text-yellow-600" />,
      title: 'Affordable Pricing',
      description: 'Completely transparent rate plans. Scooty at ₹800/day and Special Offer at ₹1000. Zero hidden peak surge charges.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-yellow-600" />,
      title: 'Serviced & Clean',
      description: 'Every self-drive scooter and bike undergoes meticulous mechanical tuning, tire checks, and sanitization before handoff.',
    },
    {
      icon: <Calendar className="w-5 h-5 text-yellow-600" />,
      title: 'Easy Reservation',
      description: 'Dynamic and seamless online booking. Reserve your scooty or bike in less than 30 seconds with instant confirmation.',
    },
    {
      icon: <Shield className="w-5 h-5 text-yellow-600" />,
      title: 'Safe & Verified',
      description: 'Equipped with basic GPS trackers, comprehensive security guidelines, and emergency local backup desk support.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Select Two-Wheeler',
      description: 'Choose from our clean fleet of Honda Activas, Suzuki Access scooties, or Royal Enfield mountain bikes.',
    },
    {
      number: '02',
      title: 'Set Rental Duration',
      description: 'Input your pickup hub point and total duration in days. Discounts are automatically applied for longer rentals.',
    },
    {
      number: '03',
      title: 'Confirm Booking',
      description: 'Verify your rental dates, price, and self-drive terms, then click "Confirm Rental Booking" to receive your secure OTP.',
    },
    {
      number: '04',
      title: 'Collect & Cruise',
      description: 'Share your OTP at our Joshiyara Central Hub, collect your keys and sanitized helmets, and start exploring!',
    },
  ];

  const appFeatureItems = [
    {
      icon: <Navigation className="w-6 h-6 text-black" />,
      bg: 'bg-yellow-400 shadow-md',
      title: 'Live GPS Navigation',
      description: 'Seamlessly follow offline and online route guides through Uttarkashi with reliable digital navigation paths.',
    },
    {
      icon: <DollarSign className="w-6 h-6 text-yellow-600" />,
      bg: 'bg-white/80 border border-slate-200/50 shadow-sm',
      title: 'Cashless UPI Payments',
      description: 'Pay quickly and securely using GPay, PhonePe, Paytm, credit/debit cards, or net banking.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-yellow-600" />,
      bg: 'bg-white/80 border border-slate-200/50 shadow-sm',
      title: 'Weekly Sanitization',
      description: 'Every two-wheeler is meticulously steam washed and disinfected before every booking cycle.',
    },
    {
      icon: <Shield className="w-6 h-6 text-black" />,
      bg: 'bg-yellow-400 ring-4 ring-yellow-400/20 shadow-lg animate-pulse',
      title: 'Emergency SOS Call',
      description: 'A single-tap emergency helpline trigger immediately alerts our Joshiyara central support team for rapid backup.',
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
              Our Premium Rental Offerings
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 mt-4 leading-relaxed font-semibold">
              From lightweight gearless scooties to heavy-duty adventure tourer motorbikes, we have everything you need to navigate Uttarkashi's picturesque mountain paths safely and comfortably.
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
