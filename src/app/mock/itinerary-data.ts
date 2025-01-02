import { Itinerary } from '../models/itinerary.model';

export const mockItineraries: Itinerary[] = [
  {
    Id: 1,
    TravelId: 101,
    FromTime: '2024-03-25T10:00:00',
    ToTime: '2024-03-25T12:00:00',
    Type: 'traveling',
    Description: 'Flight to Mumbai',
    FromDestination: 'Delhi',
    ToDestination: 'Mumbai',
    BookingId: 'FL123',
    TravelBy: 'air'
  },
  {
    Id: 2,
    TravelId: 101,
    FromTime: '2024-03-25T14:00:00',
    ToTime: '2024-03-25T16:00:00',
    Type: 'stay',
    Description: 'Client Meeting with Tech Solutions Ltd',
    Location: 'Tech Solutions Office, Mumbai'
  },
  {
    Id: 3,
    TravelId: 102,
    FromTime: '2024-04-10T08:00:00',
    ToTime: '2024-04-10T10:30:00',
    Type: 'miscellaneous',
    Description: 'Travel to Bangalore',
    FromDestination: 'Delhi',
    ToDestination: 'Bangalore',
    BookingId: 'FL456',
    TravelBy: 'air'
  },
  {
    Id: 4,
    TravelId: 102,
    FromTime: '2024-04-10T11:00:00',
    ToTime: '2024-04-10T18:00:00',
    Type: 'miscellaneous',
    Description: 'Annual Tech Conference 2024',
    Location: 'Tech Park Convention Center, Bangalore'
  },
  {
    Id: 5,
    TravelId: 103,
    FromTime: '2024-04-15T09:00:00',
    ToTime: '2024-04-15T10:00:00',
    Type: 'miscellaneous',
    Description: 'Local Transport to Training Center',
    FromDestination: 'Hotel',
    ToDestination: 'Training Center',
    BookingId: 'CAB789',
    TravelBy: 'road'
  }
];  