import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItineraryService } from '../services/itinerary.service';
import { Itinerary } from '../models/itinerary.model';

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

  constructor(
    private route: ActivatedRoute,
    private itineraryService: ItineraryService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.travelId = +params['id'];
        this.loadItineraries();
      }
    });
  }

  loadItineraries(): void {
    this.itineraryService.getItineraries(this.travelId).subscribe({
      next: (data: any) => {
        this.itineraries = data;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading itineraries:', error);
      }
    });
  }

  openItineraryModal(itinerary?: Itinerary): void {
    this.selectedItinerary = itinerary;
    this.showModal = true;
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.applyFilters();
  }

  applyFilters(): void {
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      this.filteredItineraries = this.itineraries.filter(item =>
        item.Description.toLowerCase().includes(search) ||
        item.Type.toLowerCase().includes(search) ||
        (item.Location?.toLowerCase().includes(search)) ||
        (item.FromDestination?.toLowerCase().includes(search)) ||
        (item.ToDestination?.toLowerCase().includes(search))
      );
    } else {
      this.filteredItineraries = [...this.itineraries];
    }
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
    if (this.selectedItinerary?.Id) {
      this.itineraryService.updateItinerary(this.selectedItinerary.Id, itinerary).subscribe({
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