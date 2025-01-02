export interface TravelBooking {
  BookingID?: number;
  EmployeeID: number;
  AdminID: number;
  TravelMode: 'Flight' | 'Hotel' | 'Car Rental';
  ProviderName: string;
  BookingReference: string;
  destination: string;
  StartDate: Date;
  EndDate: Date;
  TotalCost: number;
  Status: 'Booked' | 'Cancelled' | 'Completed';
  CreatedAt?: Date;
} 