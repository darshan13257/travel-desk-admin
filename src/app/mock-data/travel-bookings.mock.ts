import { TravelBooking } from '../models/travel-booking.model';

export const MOCK_TRAVEL_BOOKINGS: TravelBooking[] = [
  {
    BookingID: 1,
    EmployeeID: 101,
    AdminID: 1,
    TravelMode: 'Flight',
    ProviderName: 'Emirates Airlines',
    BookingReference: 'EMR123456',
    destination: 'New York, USA',
    StartDate: new Date('2024-04-15'),
    EndDate: new Date('2024-04-20'),
    TotalCost: 1250.00,
    Status: 'Booked',
    CreatedAt: new Date('2024-03-10')
  },
  {
    BookingID: 2,
    EmployeeID: 102,
    AdminID: 2,
    TravelMode: 'Hotel',
    ProviderName: 'Marriott Hotels',
    BookingReference: 'MHT789012',
    destination: 'San Francisco, USA',
    StartDate: new Date('2024-04-01'),
    EndDate: new Date('2024-04-05'),
    TotalCost: 800.00,
    Status: 'Completed',
    CreatedAt: new Date('2024-03-01')
  },
  {
    BookingID: 3,
    EmployeeID: 103,
    AdminID: 1,
    TravelMode: 'Car Rental',
    ProviderName: 'Hertz',
    BookingReference: 'HTZ345678',
    destination: 'Los Angeles, USA',
    StartDate: new Date('2024-03-25'),
    EndDate: new Date('2024-03-28'),
    TotalCost: 300.00,
    Status: 'Cancelled',
    CreatedAt: new Date('2024-03-05')
  },
  {
    BookingID: 4,
    EmployeeID: 104,
    AdminID: 3,
    TravelMode: 'Flight',
    ProviderName: 'Qatar Airways',
    BookingReference: 'QTR901234',
    destination: 'Seattle, USA',
    StartDate: new Date('2024-05-10'),
    EndDate: new Date('2024-05-15'),
    TotalCost: 1800.00,
    Status: 'Booked',
    CreatedAt: new Date('2024-03-15')
  },
  {
    BookingID: 5,
    EmployeeID: 105,
    AdminID: 2,
    TravelMode: 'Hotel',
    ProviderName: 'Hilton Hotels',
    BookingReference: 'HLT567890',
    destination: 'Boston, USA',
    StartDate: new Date('2024-04-20'),
    EndDate: new Date('2024-04-25'),
    TotalCost: 950.00,
    Status: 'Booked',
    CreatedAt: new Date('2024-03-12')
  }
]; 