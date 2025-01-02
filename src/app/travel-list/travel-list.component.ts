import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TravelBookingService } from '../services/travel-booking.service';
import { TravelBooking } from '../models/travel-booking.model';
import { TravelModalComponent } from './travel-modal/travel-modal.component';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent implements OnInit {
  bookings: TravelBooking[] = [];
  filteredBookings: TravelBooking[] = [];
  statusFilter: string = 'all';
  searchDestination: string = '';

  constructor(
    private dialog: MatDialog,
    private travelBookingService: TravelBookingService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.travelBookingService.getBookings().subscribe(
      bookings => {
        this.bookings = bookings;
        this.applyFilters();
      }
    );
  }

  onSearchChange(value: string): void {
    this.searchDestination = value;
    this.applyFilters();
  }

  onStatusFilterChange(value: string): void {
    this.statusFilter = value;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.bookings];

    // Apply status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(booking => {
        const today = new Date();
        switch (this.statusFilter) {
          case 'ongoing':
            return booking.StartDate <= today && booking.EndDate >= today;
          case 'future':
            return booking.StartDate > today;
          case 'completed':
            return booking.EndDate < today && booking.Status !== 'Cancelled';
          case 'cancelled':
            return booking.Status === 'Cancelled';
          default:
            return true;
        }
      });
    }

    // Apply destination search
    if (this.searchDestination.trim()) {
      const search = this.searchDestination.toLowerCase().trim();
      filtered = filtered.filter(booking => 
        booking.destination.toLowerCase().includes(search)
      );
    }

    this.filteredBookings = filtered;
  }

  openNewBookingDialog(): void {
    const dialogRef = this.dialog.open(TravelModalComponent, {
      width: '800px',
      data: { booking: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.travelBookingService.createBooking(result).subscribe(() => {
          this.loadBookings();
        });
      }
    });
  }

  openEditBookingDialog(booking: TravelBooking): void {
    const dialogRef = this.dialog.open(TravelModalComponent, {
      width: '800px',
      data: { booking }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && booking.BookingID) {
        this.travelBookingService.updateBooking(booking.BookingID, result).subscribe(() => {
          this.loadBookings();
        });
      }
    });
  }

  deleteBooking(id: number): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.travelBookingService.deleteBooking(id).subscribe(() => {
        this.loadBookings();
      });
    }
  }
}
