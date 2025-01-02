export type ItineraryType = 'traveling' | 'stay' | 'miscellaneous';

export interface Itinerary {
  Id?: number;
  TravelId: number;
  FromTime: string;
  ToTime: string;
  Type: ItineraryType;
  Description: string;
  FromDestination?: string;
  ToDestination?: string;
  BookingId?: string;
  TravelBy?: 'air' | 'road';
  Location?: string;
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

// Helper function to convert ItineraryResponse to Itinerary
export function convertToItinerary(response: ItineraryResponse): Itinerary {
  return {
    Id: response.Id,
    TravelId: response.TravelId,
    FromTime: response.FromTime,
    ToTime: response.ToTime,
    Type: response.Type as ItineraryType,
    Description: response.Description,
    FromDestination: response.FromDestination || undefined,
    ToDestination: response.ToDestination || undefined,
    BookingId: response.BookingId || undefined,
    TravelBy: (response.TravelBy as 'air' | 'road') || undefined,
    Location: response.Location || undefined
  };
} 