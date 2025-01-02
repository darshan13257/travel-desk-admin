import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ItineraryService } from '../services/itinerary.service';
import { ItineraryModalComponent } from './itinerary-modal/itinerary-modal.component';
import { Itinerary, ItineraryResponse, convertToItinerary } from '../models/itinerary.model';

@Component({
  selector: 'app-itineraries',
  templateUrl: './itineraries.component.html',
  styleUrls: ['./itineraries.component.scss']
})
export class ItinerariesComponent implements OnInit {
  travelId!: number;
  itineraries: ItineraryResponse[] = [];
  filteredItineraries: ItineraryResponse[] = [];
  searchTerm: string = '';

  constructor(
    private dialog: MatDialog,
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
      next: (data) => {
        this.itineraries = data;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading itineraries:', error);
      }
    });
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

  openItineraryModal(response?: ItineraryResponse): void {
    const itinerary = response ? convertToItinerary(response) : undefined;
    
    const dialogRef = this.dialog.open(ItineraryModalComponent, {
      width: '600px',
      data: {
        travelId: this.travelId,
        itinerary: itinerary
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (itinerary?.Id) {
          this.itineraryService.updateItinerary(itinerary.Id, result).subscribe({
            next: () => this.loadItineraries(),
            error: (error) => console.error('Error updating itinerary:', error)
          });
        } else {
          this.itineraryService.createItinerary(result).subscribe({
            next: () => this.loadItineraries(),
            error: (error) => console.error('Error creating itinerary:', error)
          });
        }
      }
    });
  }

  deleteItinerary(id: number): void {
    if (confirm('Are you sure you want to delete this itinerary?')) {
      this.itineraryService.deleteItinerary(id).subscribe({
        next: () => this.loadItineraries(),
        error: (error) => console.error('Error deleting itinerary:', error)
      });
    }
  }
} 