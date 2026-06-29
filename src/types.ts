export type RideType = 'bike_rental' | 'scooter_rental' | 'taxi_local' | 'taxi_sedan' | 'taxi_suv' | 'outstation';

export interface RideOption {
  id: string;
  type: RideType;
  category: 'taxi' | 'rental';
  name: string;
  description: string;
  basePrice: number; // For rental: daily rate. For taxi: base fare.
  pricePerKm?: number; // Only for taxi
  capacity: number;
  etaMinutes: number;
  co2SavedKg?: number;
  popular?: boolean;
}

export interface BookingState {
  pickup: string;
  pickupLatLng: [number, number] | null;
  destination: string;
  destinationLatLng: [number, number] | null;
  date: string;
  time: string;
  serviceType: 'taxi' | 'rental';
  passengers: number;
  selectedRideId: string | null;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  rideType: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'rental' | 'safety' | 'payment';
}

export interface LocationSuggestion {
  name: string;
  description: string;
  latLng: [number, number];
}

export interface ActiveRide {
  id: string;
  status: 'idle' | 'searching' | 'assigned' | 'arriving' | 'ongoing' | 'completed';
  pickup: string;
  destination: string;
  serviceType: 'taxi' | 'rental';
  passengers: number;
  rideOption: RideOption | null;
  driver: {
    name: string;
    avatar: string;
    rating: number;
    trips: number;
    phone: string;
    vehicle: string;
    plate: string;
  } | null;
  otp: string;
  progress: number; // 0 to 100 for simulation
}
