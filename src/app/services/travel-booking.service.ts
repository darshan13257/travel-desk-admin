import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TravelBooking } from '../models/travel-booking.model';
import { environment } from '../../environments/environment';
import { MOCK_TRAVEL_BOOKINGS } from '../mock-data/travel-list.data';

@Injectable({
  providedIn: 'root'
})
export class TravelBookingService {
  private apiUrl = `${environment.apiUrl}/travel-bookings`;
  private useMockData = true; // Toggle this to switch between mock and real API

  constructor(private http: HttpClient) { }

  getBookings(): Observable<TravelBooking[]> {
    if (this.useMockData) {
      return of(MOCK_TRAVEL_BOOKINGS);
    }
    return this.http.get<TravelBooking[]>(this.apiUrl);
  }

  getBooking(id: number): Observable<TravelBooking> {
    if (this.useMockData) {
      const booking = MOCK_TRAVEL_BOOKINGS.find(b => b.BookingID === id);
      return of(booking as TravelBooking);
    }
    return this.http.get<TravelBooking>(`${this.apiUrl}/${id}`);
  }

  createBooking(booking: TravelBooking): Observable<TravelBooking> {
    if (this.useMockData) {
      const newBooking = {
        ...booking,
        BookingID: Math.max(...MOCK_TRAVEL_BOOKINGS.map(b => b.BookingID ?? 0)) + 1,
        TravelId: Math.max(...MOCK_TRAVEL_BOOKINGS.map(b => b.TravelId ?? 0)) + 1
      };
      MOCK_TRAVEL_BOOKINGS.push(newBooking);
      return of(newBooking);
    }
    return this.http.post<TravelBooking>(this.apiUrl, booking);
  }

  updateBooking(id: number, booking: TravelBooking): Observable<TravelBooking> {
    if (this.useMockData) {
      const index = MOCK_TRAVEL_BOOKINGS.findIndex(b => b.BookingID === id);
      if (index !== -1) {
        MOCK_TRAVEL_BOOKINGS[index] = { ...booking, BookingID: id };
        return of(MOCK_TRAVEL_BOOKINGS[index]);
      }
    }
    return this.http.put<TravelBooking>(`${this.apiUrl}/${id}`, booking);
  }

  deleteBooking(id: number): Observable<void> {
    if (this.useMockData) {
      const index = MOCK_TRAVEL_BOOKINGS.findIndex(b => b.BookingID === id);
      if (index !== -1) {
        MOCK_TRAVEL_BOOKINGS.splice(index, 1);
      }
      return of(void 0);
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 