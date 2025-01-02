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
  selectedStatus: string = 'all';

  statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'future', label: 'Future' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  constructor(
    private router: Router,
    private travelBookingService: TravelBookingService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.travelBookingService.getBookings().subscribe(data => {
      this.bookings = data;
      this.applyFilters();
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

  onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedStatus = value;
    this.applyFilters();
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.bookings];

    // Apply search filter
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(booking =>
        booking.Destination.toLowerCase().includes(search) ||
        booking.Source.toLowerCase().includes(search) ||
        booking.Purpose.toLowerCase().includes(search)
      );
    }

    // Apply status filter
    if (this.selectedStatus !== 'all') {
      const today = new Date();
      filtered = filtered.filter(booking => {
        const status = this.getTravelStatus(booking);
        return status.toLowerCase() === this.selectedStatus;
      });
    }

    this.filteredBookings = filtered;
  }

  getTravelStatus(booking: TravelBooking): string {
    const today = new Date();
    const startDate = new Date(booking.StartDate);
    const endDate = new Date(booking.EndDate);
    
    if (booking.Status === 'Cancelled') {
      return 'cancelled';
    }
    
    if (startDate <= today && endDate >= today) {
      return 'ongoing';
    } else if (startDate > today) {
      return 'future';
    } else if (endDate < today) {
      return 'completed';
    }
    
    return booking.Status.toLowerCase();
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'ongoing': 'status-ongoing',
      'future': 'status-future',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };
    return statusMap[status.toLowerCase()] || '';
  }
}
