import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TravelBooking } from '../models/travel-booking.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TravelBookingService {
  private apiUrl = `${environment.apiUrl}/travel-bookings`;

  constructor(private http: HttpClient) { }

  getBookings(): Observable<TravelBooking[]> {
    return this.http.get<TravelBooking[]>(this.apiUrl);
  }

  getBooking(id: number): Observable<TravelBooking> {
    return this.http.get<TravelBooking>(`${this.apiUrl}/${id}`);
  }

  createBooking(booking: TravelBooking): Observable<TravelBooking> {
    return this.http.post<TravelBooking>(this.apiUrl, booking);
  }

  updateBooking(id: number, booking: TravelBooking): Observable<TravelBooking> {
    return this.http.put<TravelBooking>(`${this.apiUrl}/${id}`, booking);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 