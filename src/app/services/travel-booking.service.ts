import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TravelBookingResponse, TravelBooking } from '../models/travel-booking.model';

@Injectable({
  providedIn: 'root'
})
export class TravelBookingService {
  private apiUrl = 'http://172.16.67.144:8009';

  constructor(private http: HttpClient) { }

  getBookings(): Observable<TravelBookingResponse[]> {
    return this.http.get<TravelBookingResponse[]>(`${this.apiUrl}/travelbookings/get_travel_bookings_info`);
  }

  getBooking(id: number): Observable<TravelBookingResponse> {
    return this.http.get<TravelBookingResponse>(`${this.apiUrl}/travelbookings/get_travel_booking/${id}`);
  }

   // Add this new method
   getAllLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/travelbookings/get_all_locations`);
  }


  createBooking(booking: TravelBooking, userId: number): Observable<TravelBookingResponse> {
    return this.http.post<TravelBookingResponse>(
      `${this.apiUrl}/travelbookings/create_travelbookings?user_id=${userId}`, 
      booking
    );
  }
  updateBooking(id: number, booking: TravelBooking): Observable<TravelBookingResponse> {
    return this.http.put<TravelBookingResponse>(`${this.apiUrl}/travelbookings/update/${id}`, booking);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/travelbookings/delete/${id}`);
  }
} 