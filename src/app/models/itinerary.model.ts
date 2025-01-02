export type ItineraryType = 'traveling' | 'stay' | 'miscellaneous';

export interface Itinerary {
  Description: string;
  ToLocation: number;
  EndTime: string;
  Activity: string;
  BookingId: number;
  ItineraryID: number;
  FromLocation: number;
  StartTime: string;
  Day: number;
  TravelId: number;
}

export interface ItineraryResponse {
  Id: number;
  TravelId: number;
  FromTime: string;
  ToTime: string;
  Type: string;
  Description: string;
  FromDestination: string | null;
  ToDestination: string | null;
  BookingId: string | null;
  TravelBy: string | null;
  Location: string | null;
}

// Hel