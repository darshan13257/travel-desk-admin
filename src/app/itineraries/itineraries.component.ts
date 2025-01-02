import { Component, OnInit } from '@angular/core';
import { TravelBookingService } from '../services/travel-booking.service';
import { Itinerary } from '../models/itinerary.model';
import { ActivatedRoute } from '@angular/router';
import { ItineraryService } from '../services/itinerary.service';

@Component({
  selector: 'app-itineraries',
  templateUrl: './itineraries.component.html',
  styleUrls: ['./itineraries.component.scss']
})
export class ItinerariesComponent implements OnInit {
  showModal = false;
  selectedItinerary?: Itinerary;
  travelId!: number;
  itineraries: Itinerary[] = [];
  filteredItineraries: Itinerary[] = [];
  searchTerm: string = '';
  loading = false;

  constructor(private travelBookingService: TravelBookingService,
    private route: ActivatedRoute,
    private itineraryService: ItineraryService) {}

  ngOnInit(): void {
    this.loadItineraries();
  }

  loadItineraries(): void {
    this.loading = true;
    const userId = 1; // Get this from your auth service
    this.travelBookingService.getItineraries(userId).subscribe({
      next: (data) => {
        this.itineraries = data;
        this.filteredItineraries = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading itineraries:', error);
        this.loading = false;
      }
    });
  }

  onSearchChange(term: string): void {
    if (!term) {
      this.filteredItineraries = this.itineraries;
      return;
    }

    this.filteredItineraries = this.itineraries.filter(item => 
      item.Activity.toLowerCase().includes(term.toLowerCase()) ||
      item.Description.toLowerCase().includes(term.toLowerCase())
    );
  }

  openItineraryModal(itinerary?: Itinerary): void {
    this.selectedItinerary = itinerary;
    this.showModal = true;
  }



  deleteItinerary(id: number): void {
    if (confirm('Are you sure you want to delete this itinerary?')) {
      this.itineraryService.deleteItinerary(id).subscribe({
        next: () => this.loadItineraries(),
        error: (error) => console.error('Error deleting itinerary:', error)
      });
    }
  }

  onSaveItinerary(itinerary: Itinerary): void {
    if (this.selectedItinerary?.ItineraryID) {
      this.itineraryService.updateItinerary(this.selectedItinerary.ItineraryID, itinerary).subscribe({
        next: () => {
          this.loadItineraries();
          this.showModal = false;
        },
        error: (error) => console.error('Error updating itinerary:', error)
      });
    } else {
      this.itineraryService.createItinerary({ ...itinerary, TravelId: this.travelId }).subscribe({
        next: () => {
          this.loadItineraries();
          this.showModal = false;
        },
        error: (error) => console.error('Error creating itinerary:', error)
      });
    }
  }
} 