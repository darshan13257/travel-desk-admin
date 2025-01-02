import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelBookingService } from '../services/travel-booking.service';
import { TravelBookingResponse } from '../models/travel-booking.model';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent implements OnInit {
  bookings: TravelBookingResponse[] = [];
  filteredBookings: TravelBookingResponse[] = [];
  searchTerm: string = '';
  selectedStatus: string = 'all';

  statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'To be approved', label: 'To Be Approved' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Cancelled', label: 'Cancelled' }
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

  applyFilters(): void {
    let filtered = [...this.bookings];

    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.Booking.ToLocation.LocationName.toLowerCase().includes(search) ||
        item.Booking.FromLocation.LocationName.toLowerCase().includes(search) ||
        item.Booking.TravelMode.toLowerCase().includes(search) ||
        item.User.Name.toLowerCase().includes(search)
      );
    }

    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(item => 
        item.Booking.Status === this.selectedStatus
      );
    }

    this.filteredBookings = filtered;
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'To be approved': 'status-to-be-approved',
      'Approved': 'status-approved',
      'Rejected': 'status-rejected',
      'Cancelled': 'status-cancelled'
    };
    return statusMap[status] || '';
  }
}
