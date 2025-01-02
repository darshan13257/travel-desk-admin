import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TravelBooking } from '../models/travel-booking.model';
import { MOCK_TRAVEL_BOOKINGS } from '../mock-data/travel-bookings.mock';

@Injectable({
  providedIn: 'root'
})
export class TravelBookingService {
  private bookings = [...MOCK_TRAVEL_BOOKINGS];

  constructor(private http: HttpClient) { }

  getBookings(): Observable<TravelBooking[]> {
    return of(this.bookings);
  }

  getBooking(id: number): Observable<TravelBooking | undefined> {
    return of(this.bookings.find(booking => booking.BookingID === id));
  }

  createBooking(booking: TravelBooking): Observable<TravelBooking> {
    const newBooking = {
      ...booking,
      BookingID: this.getNextId(),
      CreatedAt: new Date()
    };
    this.bookings.push(newBooking);
    return of(newBooking);
  }

  updateBooking(id: number, booking: TravelBooking): Observable<TravelBooking> {
    const index = this.bookings.findIndex(b => b.BookingID === id);
    if (index !== -1) {
      this.bookings[index] = { ...this.bookings[index], ...booking };
      return of(this.bookings[index]);
    }
    throw new Error('Booking not found');
  }

  deleteBooking(id: number): Observable<void> {
    const index = this.bookings.findIndex(b => b.BookingID === id);
    if (index !== -1) {
      this.bookings.splice(index, 1);
      return of(void 0);
    }
    throw new Error('Booking not found');
  }

  private getNextId(): number {
    return Math.max(...this.bookings.map(b => b.BookingID ?? 0)) + 1;
  }
} 