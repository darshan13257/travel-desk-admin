import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Itinerary, ItineraryResponse } from '../models/itinerary.model';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private apiUrl = 'http://172.16.67.144:8009';

  constructor(private http: HttpClient) { }

  getItineraries(travelId: number): Observable<ItineraryResponse[]> {
    return this.http.get<ItineraryResponse[]>(`${this.apiUrl}/get/${travelId}`);
  }

  createItinerary(itinerary: Itinerary): Observable<ItineraryResponse> {
    return this.http.post<ItineraryResponse>(`${this.apiUrl}/travelbookings/create_itineraries`, itinerary);
  }

  updateItinerary(id: number, itinerary: Itinerary): Observable<ItineraryResponse> {
    return this.http.put<ItineraryResponse>(`${this.apiUrl}/update/${id}`, itinerary);
  }

  deleteItinerary(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
} 