export interface TravelBooking {
  BookingID?: number;
  TravelId?: number;
  TravelType: string;
  TravelMode?: string;
  Purpose: string;
  Source: string;
  Destination: string;
  ProviderName?: string;
  StartDate: Date;
  EndDate: Date;
  Status: string;
  Description?: string;
  TotalCost?: number;
} 