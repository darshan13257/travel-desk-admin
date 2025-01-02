import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Itinerary, ItineraryDetail } from '../models/itinerary.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private apiUrl = `${environment.apiUrl}/itineraries`;

  constructor(private http: HttpClient) { }

  getItineraries(): Observable<Itinerary[]> {
    return this.http.get<Itinerary[]>(this.apiUrl);
  }

  getItineraryDetails(itineraryId: number): Observable<ItineraryDetail[]> {
    return this.http.get<ItineraryDetail[]>(`${this.apiUrl}/${itineraryId}/details`);
  }

  createItinerary(itinerary: Itinerary): Observable<Itinerary> {
    return this.http.post<Itinerary>(this.apiUrl, itinerary);
  }

  updateItinerary(id: number, itinerary: Itinerary): Observable<Itinerary> {
    return this.http.put<Itinerary>(`${this.apiUrl}/${id}`, itinerary);
  }

  deleteItinerary(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createItineraryDetail(detail: ItineraryDetail): Observable<ItineraryDetail> {
    return this.http.post<ItineraryDetail>(`${this.apiUrl}/details`, detail);
  }

  updateItineraryDetail(id: number, detail: ItineraryDetail): Observable<ItineraryDetail> {
    return this.http.put<ItineraryDetail>(`${this.apiUrl}/details/${id}`, detail);
  }

  deleteItineraryDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/details/${id}`);
  }
} 