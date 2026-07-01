import { RideOption, Testimonial, FAQItem, LocationSuggestion } from './types';

export const rideOptions: RideOption[] = [
  {
    id: 'activa_day_rental',
    type: 'scooter_rental',
    category: 'rental',
    name: 'Honda Activa 125 (Day Rental)',
    description: 'Daytime exploration plan. Lightweight, gearless, and fuel-efficient scooter. Perfect for local temple visits and daytime sightseeing in Uttarkashi.',
    basePrice: 800, // Daily scooty rental rate
    capacity: 2,
    etaMinutes: 0,
    popular: false,
  },
  {
    id: 'activa_24h_special',
    type: 'scooter_rental',
    category: 'rental',
    name: 'Honda Activa 125 (24H Special Package)',
    description: 'Full 24-hour flexibility. Over-night plan, includes extra helmet, emergency toolkit, and local route maps for maximum travel freedom.',
    basePrice: 1000, // Special package rate
    capacity: 2,
    etaMinutes: 0,
    popular: true,
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
    description: 'Honda Activa 125 rentals starting at just ₹800 for the Day Rental, and only ₹1000 for our 24-Hour Special Package. Flat, transparent rates.',
  },
  {
    id: 'vehicles',
    title: 'Exclusive Honda Activa 125',
    description: 'We maintain a highly specialized fleet of premium, powerful, and fuel-efficient Honda Activa 125 scooties, serviced regularly for safety.',
  },
  {
    id: 'helmets',
    title: 'Helmets Included',
    description: 'Every rental includes sanitized, safety-certified helmets and required emergency toolkits at zero extra cost.',
  },
  {
    id: 'booking',
    title: 'Easy Online Booking',
    description: 'Seamless online reservation system. Book and pick up your scooter at our Joshiyara hub in minutes.',
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
    description: 'Every scooter is thoroughly washed, sanitized, and inspected between every rental cycle.',
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
    comment: 'Rented the Honda Activa 125 for my commute around Uttarkashi and Joshiyara. The scooty was in pristine mechanical condition. Extremely smooth handoff near the CSC shop!',
    rideType: 'Honda Activa 125',
  },
  {
    id: '2',
    name: 'Priya Rawat',
    role: 'Solo Traveler',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Rented a scooty for 3 days to visit local sightseeing points. The Honda Activa 125 is an absolute breeze to handle, lightweight, and incredibly budget-friendly at ₹800/day!',
    rideType: 'Honda Activa 125',
  },
  {
    id: '3',
    name: 'Amit Singh',
    role: 'Pilgrim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 4.9,
    comment: 'Took the 24 Hours Special Discount Package for ₹1000. They delivered the scooter directly to my hotel in Joshiyara, along with two perfectly clean helmets. Highly recommended!',
    rideType: 'Honda Activa 125',
  },
];

export const faqs: FAQItem[] = [
  {
    id: 'q1',
    category: 'booking',
    question: 'How do I book a Honda Activa 125 with Urban Wheels?',
    answer: 'Simply use our booking form above! Select your plan (Day Rental or 24-Hour Special Package), enter your Name, Mobile Number, Pickup Location, Date, and Time, then click "Book Scooter Now". You will be shown a confirmation page with your Booking ID instantly—no tedious OTP or verification screens required!',
  },
  {
    id: 'q2',
    category: 'rental',
    question: 'What documents are required to rent a scooter?',
    answer: 'To collect your Honda Activa 125, you must present a valid Indian Driving License (DL) authorizing gearless two-wheelers, along with a Government ID (such as an Aadhaar Card). valid DL & Aadhaar are verified in person at collection.',
  },
  {
    id: 'q3',
    category: 'safety',
    question: 'Are helmets and safety gear included in the rental price?',
    answer: 'Yes! We provide up to two clean, sanitized, safety-certified helmets and a basic emergency toolkit with every rental vehicle at zero additional cost.',
  },
  {
    id: 'q4',
    category: 'payment',
    question: 'What are your payment terms and security deposit rules?',
    answer: 'We support all major payment options including UPI (Google Pay, PhonePe, Paytm), credit/debit cards, and cash. There is no online prepayment required—simply pay when you pick up your scooter at our Joshiyara hub.',
  },
];
