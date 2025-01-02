import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelBookingService } from '../services/travel-booking.service';
import { TravelBooking } from '../models/travel-booking.model';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent implements OnInit {
  bookings: TravelBooking[] = [];
  filteredBookings: TravelBooking[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private travelBookingService: TravelBookingService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.travelBookingService.getBookings().subscribe(data => {
      this.bookings = data.map(booking => ({
        ...booking,
        StartDate: new Date(booking.StartDate),
        EndDate: new Date(booking.EndDate)
      }));
      this.filterBookings();
    });
  }

  onNewTravel(): void {
    this.router.navigate(['/travel-form']);
  }

  onEditTravel(bookingId: number): void {
    this.router.navigate(['/travel-form'], {
      queryParams: { id: bookingId }
    });
  }

  deleteBooking(id: number): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.travelBookingService.deleteBooking(id).subscribe(() => {
        this.loadBookings();
      });
    }
  }

  filterBookings(): void {
    if (!this.searchTerm) {
      this.filteredBookings = this.bookings;
      return;
    }

    const search = this.searchTerm.toLowerCase();
    this.filteredBookings = this.bookings.filter(booking =>
      booking.Destination.toLowerCase().includes(search) ||
      booking.Source.toLowerCase().includes(search) ||
      booking.Purpose.toLowerCase().includes(search)
    );
  }

  getTravelStatus(booking: TravelBooking): string {
    const today = new Date();
    
    if (booking.StartDate <= today && booking.EndDate >= today) {
      return 'In Progress';
    } else if (booking.StartDate > today) {
      return 'Upcoming';
    } else if (booking.EndDate < today) {
      return booking.Status !== 'Cancelled' ? 'Completed' : 'Cancelled';
    }
    return booking.Status;
  }
}
