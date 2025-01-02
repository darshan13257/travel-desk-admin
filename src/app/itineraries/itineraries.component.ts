import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItineraryService } from '../services/itinerary.service';
import { Itinerary } from '../models/itinerary.model';
import { ItineraryModalComponent } from './itinerary-modal/itinerary-modal.component';

@Component({
  selector: 'app-itineraries',
  templateUrl: './itineraries.component.html',
  styleUrls: ['./itineraries.component.scss']
})
export class ItinerariesComponent implements OnInit {
  itineraries: Itinerary[] = [];
  filteredItineraries: Itinerary[] = [];
  searchTerm: string = '';

  constructor(
    private dialog: MatDialog,
    private itineraryService: ItineraryService
  ) {}

  ngOnInit(): void {
    this.loadItineraries();
  }

  loadItineraries(): void {
    this.itineraryService.getItineraries().subscribe(data => {
      this.itineraries = data;
      this.filterItineraries();
    });
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.filterItineraries();
  }

  private filterItineraries(): void {
    if (!this.searchTerm) {
      this.filteredItineraries = this.itineraries;
      return;
    }

    this.filteredItineraries = this.itineraries.filter(itinerary =>
      itinerary.Activity.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openNewItineraryDialog(): void {
    const dialogRef = this.dialog.open(ItineraryModalComponent, {
      width: '800px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itineraryService.createItinerary(result).subscribe(() => {
          this.loadItineraries();
        });
      }
    });
  }

  openEditItineraryDialog(itinerary: Itinerary): void {
    const dialogRef = this.dialog.open(ItineraryModalComponent, {
      width: '800px',
      data: { isEdit: true, itinerary }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && itinerary.ItineraryID) {
        this.itineraryService.updateItinerary(itinerary.ItineraryID, result).subscribe(() => {
          this.loadItineraries();
        });
      }
    });
  }

  deleteItinerary(id: number): void {
    if (confirm('Are you sure you want to delete this itinerary?')) {
      this.itineraryService.deleteItinerary(id).subscribe(() => {
        this.loadItineraries();
      });
    }
  }
} 