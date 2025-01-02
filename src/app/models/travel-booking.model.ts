export interface Location {
  Id: number;
  LocationName: string;
}

export interface User {
  UserId: number;
  Name: string;
  MobileNo: string | null;
  Email: string;
  IsAdmin: boolean;
}

export interface Booking {
  TravelId: number;
  TravelMode: string;
  ProviderName: string;
  BookingReference: string;
  StartDate: string;
  EndDate: string;
  TotalCost: number;
  Status: string;
  CreatedAt: string;
  FromLocation: Location;
  ToLocation: Location;
}

export interface TravelBookingResponse {
  Booking: Booking;
  User: User;
}

// Add this interface for form handling
export interface TravelBooking {
  TravelId?: number;
  TravelMode: string;
  ProviderName: string;
  BookingReference: string;
  StartDate: string;
  EndDate: string;
  TotalCost: number;
  Status: string;
  FromLocationId: number;
  ToLocationId: number;
} 