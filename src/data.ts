import { RideOption, Testimonial, FAQItem, LocationSuggestion } from './types';

export const rideOptions: RideOption[] = [
  {
    id: 'bike_rental',
    type: 'bike_rental',
    category: 'rental',
    name: 'Mountain Tourer Bike',
    description: 'Royal Enfield Himalayan / Bullet. Built for rugged Himalayan passes. High torque & dual-channel ABS.',
    basePrice: 1200, // Daily rental rate
    capacity: 2,
    etaMinutes: 0,
    popular: true,
  },
  {
    id: 'scooter_rental',
    type: 'scooter_rental',
    category: 'rental',
    name: 'Family Scooter (Activa)',
    description: 'Honda Activa 6G / Suzuki Access. Lightweight & gearless. Perfect for exploring Uttarkashi town temples.',
    basePrice: 450, // Daily rental rate
    capacity: 2,
    etaMinutes: 0,
  },
  {
    id: 'taxi_local',
    type: 'taxi_local',
    category: 'taxi',
    name: 'Local Hatchback Taxi',
    description: 'Alto / WagonR with experienced hill driver. Best for narrow bazaar streets and quick local temple commutes.',
    basePrice: 120, // Base fare
    pricePerKm: 14,
    capacity: 4,
    etaMinutes: 4,
  },
  {
    id: 'taxi_sedan',
    type: 'taxi_sedan',
    category: 'taxi',
    name: 'Comfort Sedan Taxi',
    description: 'Maruti Dzire / Toyota Etios. Smooth, air-conditioned, and spacious sedan for comfortable intercity rides.',
    basePrice: 180,
    pricePerKm: 18,
    capacity: 4,
    etaMinutes: 6,
  },
  {
    id: 'taxi_suv',
    type: 'taxi_suv',
    category: 'taxi',
    name: 'Mountain Cruiser SUV',
    description: 'Mahindra Bolero / Scorpio / Innova. Robust 4x4 capabilities. Perfect for high-altitude roads & group luggage.',
    basePrice: 300,
    pricePerKm: 25,
    capacity: 7,
    etaMinutes: 8,
    popular: true,
  },
  {
    id: 'outstation',
    type: 'outstation',
    category: 'taxi',
    name: 'Char Dham Tour Cab',
    description: 'Dedicated multi-day tourist vehicle for Gangotri, Yamunotri, Dehradun Airport or Rishikesh sightseeing.',
    basePrice: 600,
    pricePerKm: 22,
    capacity: 6,
    etaMinutes: 12,
  },
];

export const popularDestinations: LocationSuggestion[] = [
  {
    name: "Santri's CSC, Joshiyara",
    description: 'Ward No. 08, Joshiyara, Uttarkashi, Uttarakhand - 249193',
    latLng: [30.7251, 78.4370],
  },
  {
    name: 'Kashi Vishwanath Temple',
    description: 'Ancient temple dedicated to Lord Shiva, Central Uttarkashi town',
    latLng: [30.7268, 78.4335],
  },
  {
    name: 'Gangotri Temple Complex',
    description: 'Sacred Himalayan shrine on the banks of Bhagirathi River (100 km)',
    latLng: [31.0024, 78.9398],
  },
  {
    name: 'Jolly Grant Airport, Dehradun',
    description: 'Dehradun Airport - Major flight connection hub (~170 km)',
    latLng: [30.1897, 78.2081],
  },
  {
    name: 'Chinyalisaur Helipad Lake',
    description: 'Helipad ground & scenic Bhagirathi river lake views (~35 km)',
    latLng: [30.5422, 78.3308],
  },
];

export const whyChooseUs = [
  {
    id: 'affordable',
    title: 'Affordable Pricing',
    description: 'Highly competitive flat rates with zero hidden surge fees. Rent an Activa for just ₹450/day or book mountain cabs affordably.',
  },
  {
    id: 'drivers',
    title: 'Professional Drivers',
    description: 'Our drivers are native mountain-trained hill captains who know Uttarkashi’s curves, weather, and safe shortcuts.',
  },
  {
    id: 'clean',
    title: 'Clean Vehicles',
    description: 'All self-drive motorbikes, scooters, and cabs undergo rigorous weekly sanitization, fluid inspection, and tire-tread checks.',
  },
  {
    id: 'booking',
    title: 'Easy Booking',
    description: 'Dynamic and hassle-free scheduling via our responsive mobile-friendly web layout. Reserve with just one click.',
  },
  {
    id: 'pickup',
    title: 'Fast Pickup',
    description: 'With vehicles stationed across Ward No. 8, Joshiyara, Gyansu, and Chinyalisaur, enjoy pickups under 8 minutes.',
  },
  {
    id: 'safety',
    title: 'Safe & Reliable',
    description: 'Full GPS monitoring, offline route support, secure digital OTPs, and quick assistance for supreme peace of mind.',
  },
  {
    id: 'support',
    title: '24/7 Customer Support',
    description: 'Dedicated local helpline support for both tourists, pilgrims, and daily commuters across Uttarkashi.',
  },
];

export const appFeatures = [
  {
    id: 'tracking',
    title: 'Live Hill Tracking',
    description: 'Share your live route coordinates with emergency contacts and monitor ride progress on twisty terrain.',
  },
  {
    id: 'cashless',
    title: 'Cashless Payments',
    description: 'Pay instantly via UPI (GPay, PhonePe, Paytm), Credit/Debit cards, Net banking, or cash directly.',
  },
  {
    id: 'ratings',
    title: 'Driver Ratings',
    description: 'Verify your mountain captain’s background and previous pilgrim ratings to ensure maximum comfort.',
  },
  {
    id: 'sos',
    title: 'SOS Emergency Support',
    description: 'An active single-tap emergency alert that triggers real-time backup dispatch from our central Joshiyara desk.',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Negi',
    role: 'Local Trekking Guide',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Rented the Royal Enfield Himalayan for my solo ride to Harsil Valley. The bike was in absolutely flawless mechanical condition. Extremely smooth handoff near Joshiyara bridge!',
    rideType: 'Bike Rental',
  },
  {
    id: '2',
    name: 'Anjali Sharma',
    role: 'Char Dham Pilgrim',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Booked the Mountain Cruiser SUV for our family pilgrimage to Gangotri. Our driver was extremely polite, cautious around landslides, and acted as a wonderful local guide!',
    rideType: 'Mountain SUV',
  },
  {
    id: '3',
    name: 'Suresh Pant',
    role: 'Daily Commuter',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 4.9,
    comment: 'I use their local hatchback taxi services for commuting between Chinyalisaur and Uttarkashi town. Pickups are always incredibly fast, and pricing is fully transparent with no hidden taxes.',
    rideType: 'Local Taxi',
  },
];

export const faqs: FAQItem[] = [
  {
    id: 'q1',
    category: 'booking',
    question: 'How do I book a Taxi or Two-Wheeler with Urban Wheels?',
    answer: 'You can easily plan your journey right on our website. Input your pickup and destination locations, select your service category (Taxi Booking or Two-Wheeler Rental), specify the date and time, and click "Find Available Rides". You can confirm your booking instantly!',
  },
  {
    id: 'q2',
    category: 'rental',
    question: 'What documents are required to rent a self-drive bike or scooter?',
    answer: 'To rent a two-wheeler, you must present a valid Indian Driving License (DL) authorizing geared/gearless two-wheelers, along with a Government ID (such as an Aadhar Card or Voter ID). We provide high-quality sanitized helmets and a full tank of fuel.',
  },
  {
    id: 'q3',
    category: 'safety',
    question: 'Are your vehicles fitted for steep Himalayan mountain terrain?',
    answer: 'Yes, absolutely. Mountain safety is our core tenet. Our self-drive bikes and SUVs undergo intensive mechanical fitness tests, brake pad evaluations, and engine health reviews weekly. All our taxi drivers are native mountain captains certified in commercial hill driving.',
  },
  {
    id: 'q4',
    category: 'payment',
    question: 'What are your payment terms and cancellation guidelines?',
    answer: 'We support multiple payment modes including UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and direct cash handovers. You can cancel your taxi booking free of charge up to 10 minutes after booking.',
  },
];
