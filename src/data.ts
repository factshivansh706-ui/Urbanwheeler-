import { RideOption, Testimonial, FAQItem, LocationSuggestion } from './types';

export const rideOptions: RideOption[] = [
  {
    id: 'scooter_rental',
    type: 'scooter_rental',
    category: 'rental',
    name: 'Scooty Rental',
    description: 'Honda Activa 6G / Suzuki Access. Lightweight & gearless. Perfect for exploring Uttarkashi town temples and surrounding mountain pathways.',
    basePrice: 800, // Daily scooty rental rate
    capacity: 2,
    etaMinutes: 0,
    popular: true,
  },
  {
    id: 'special_offer',
    type: 'scooter_rental',
    category: 'rental',
    name: 'Special Offer: 24 Hours Rental',
    description: '24 Hours Rental – ₹1000 (Special Discount Package) including extra helmet, toolkit, and local route maps.',
    basePrice: 1000, // Special package rate
    capacity: 2,
    etaMinutes: 0,
    popular: true,
  },
  {
    id: 'bike_rental',
    type: 'bike_rental',
    category: 'rental',
    name: 'Bike Rental (Adventure Tourer)',
    description: 'Royal Enfield Himalayan / Bullet. Built for rugged Himalayan passes. High torque, dual-channel ABS, and spacious luggage racks.',
    basePrice: 1200, // Daily adventure bike rate
    capacity: 2,
    etaMinutes: 0,
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
    description: 'Scooty rentals starting at just ₹800/day, and our Special 24 Hours package for only ₹1000. Flat transparent rates.',
  },
  {
    id: 'vehicles',
    title: 'Premium Fleet',
    description: 'Latest model Honda Activas, Suzuki Access scooties, and heavy Royal Enfields, regularly serviced and sanitised.',
  },
  {
    id: 'helmets',
    title: 'Helmets Included',
    description: 'Every rental includes sanitized, safety-certified helmets and required emergency toolkits at zero extra cost.',
  },
  {
    id: 'booking',
    title: 'Easy Online Booking',
    description: 'Seamless online reservation system. Book and pick up your scooter or bike at our Joshiyara hub in minutes.',
  },
  {
    id: 'pickup',
    title: 'Fast Handoff',
    description: 'Central pick-up points across Joshiyara, Ward No. 8 and surrounding areas. Start your mountain ride immediately.',
  },
  {
    id: 'safety',
    title: 'Safe & Reliable',
    description: 'Full roadside safety support, comprehensive verification checkups, and instant helpline support.',
  },
  {
    id: 'support',
    title: '24/7 Customer Support',
    description: 'Our dedicated local team in Uttarkashi is available around the clock to assist you with any questions or help.',
  },
];

export const appFeatures = [
  {
    id: 'tracking',
    title: 'Live GPS Tracking',
    description: 'Monitor your self-drive rental coordinates and navigate winding Uttarakhand mountain slopes safely.',
  },
  {
    id: 'cashless',
    title: 'Cashless UPI Payments',
    description: 'Pay quickly and securely using GPay, PhonePe, Paytm, credit/debit cards, or net banking.',
  },
  {
    id: 'sanitized',
    title: 'Vehicle Sanitization',
    description: 'Every scooter and bike is thoroughly washed, sanitized, and inspected between every rental cycle.',
  },
  {
    id: 'sos',
    title: 'SOS Emergency Help',
    description: 'An emergency contact button connects you instantly to our central Joshiyara desk for dynamic backup.',
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
    name: 'Priya Rawat',
    role: 'Solo Traveler',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Rented a scooty for 3 days to visit Kashi Vishwanath temple and local sightseeing points. It was an absolute breeze to handle, lightweight, and incredibly budget-friendly at ₹800/day!',
    rideType: 'Scooty Rental',
  },
  {
    id: '3',
    name: 'Amit Singh',
    role: 'Pilgrim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 4.9,
    comment: 'Took the 24 Hours Special Discount Package for ₹1000. They delivered the scooter directly to my hotel in Joshiyara, along with two perfectly clean helmets. Super high recommended!',
    rideType: 'Special Offer',
  },
];

export const faqs: FAQItem[] = [
  {
    id: 'q1',
    category: 'booking',
    question: 'How do I book a scooter or bike with Urban Wheels?',
    answer: 'Simply use our booking form above! Input your pickup hub location, specify rental start date and time, choose your rental duration (in days), and select the scooter or bike of your choice. You can confirm your rental instantly.',
  },
  {
    id: 'q2',
    category: 'rental',
    question: 'What documents are required to rent a two-wheeler?',
    answer: 'To rent a scooty or bike, you must present a valid Indian Driving License (DL) authorizing geared or gearless two-wheelers, along with a Government ID (such as an Aadhaar Card). International guests must share their International Driving Permit.',
  },
  {
    id: 'q3',
    category: 'safety',
    question: 'Are helmets and safety gear included in the rental price?',
    answer: 'Yes! We provide up to two clean, sanitized, safety-certified helmets and a basic toolkit with every rental vehicle. Your safety is our absolute priority.',
  },
  {
    id: 'q4',
    category: 'payment',
    question: 'What are your payment terms and security deposit rules?',
    answer: 'We support all major payment options including UPI (Google Pay, PhonePe, Paytm), credit cards, and cash. There is a small fully-refundable security deposit of ₹1,000 collected during vehicle pickup which is returned instantly on drop-off.',
  },
];
