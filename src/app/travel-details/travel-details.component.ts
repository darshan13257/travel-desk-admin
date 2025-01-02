import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TravelBookingService } from '../services/travel-booking.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.component.html',
  styleUrls: ['./travel-details.component.scss']
})
export class TravelDetailsComponent implements OnInit {
  travelForm!: FormGroup;
  isEditMode = false;
  bookingId?: number;
  loading = false;
  
  travelModes = [
    { name: 'Flight', value: 'Flight' },
    { name: 'Train', value: 'Train' },
    { name: 'Car Rental', value: 'Car Rental' }
  ];

  locations: any[] = [];

  sponseredBy = [
    { label: 'Self', value: 1 },
    { label: 'Organisation', value: 2 }
  ];

  constructor(
    private fb: FormBuilder,
    private travelBookingService: TravelBookingService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.travelForm = this.fb.group({
      EmployeeID: [0],
      AdminID: [0],
      TravelMode: ['', Validators.required],
      ProviderName: [0, Validators.required],
      BookingReference: ['123456'],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      TotalCost: [0, Validators.required],
      Status: ['To be approved'],
      CreatedAt: [new Date().toISOString()],
      FromLocation: [0, Validators.required],
      ToLocation: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.bookingId = +params['id'];
        this.loadBookingDetails();
      }
    });


    this.loadLocations();
  }

  loadLocations(): void {
    this.travelBookingService.getAllLocations().subscribe({
      next: (locations) => {
        this.locations = locations;
      },
      error: (error) => {
        console.error('Error loading locations:', error);
        // Handle error (show message to user)
      }
    });
  }

  loadBookingDetails(): void {
    if (this.bookingId) {
      this.travelBookingService.getBooking(this.bookingId).subscribe({
        next: (response) => {
          const booking = response.Booking;
          this.travelForm.patchValue({
            EmployeeID: 0, // Set appropriate value
            AdminID: 0, // Set appropriate value
            TravelMode: booking.TravelMode,
            ProviderName: booking.ProviderName,
            BookingReference: booking.BookingReference,
            StartDate: booking.StartDate,
            EndDate: booking.EndDate,
            TotalCost: booking.TotalCost,
            Status: booking.Status,
            CreatedAt: booking.CreatedAt,
            FromLocation: booking.FromLocation.Id,
            ToLocation: booking.ToLocation.Id
          });
        },
        error: (error) => {
          console.error('Error loading booking details:', error);
          // Handle error (show message to user)
        }
      });
    }
  }

  onSubmit(): void {
    if (this.travelForm.valid) {
      const formData = this.travelForm.value;
      const userId = this.authService.getUserId(); // Get this from your auth service

      if (this.isEditMode && this.bookingId) {
        this.travelBookingService.updateBooking(this.bookingId, formData).subscribe({
          next: () => this.handleSuccess(),
          error: (error) => this.handleError(error)
        });
      } else {
        this.travelBookingService.createBooking(formData, userId).subscribe({
          next: () => this.handleSuccess(),
          error: (error) => this.handleError(error)
        });
      }
    }
  }

  private handleSuccess(): void {
    // Navigate back to list or show success message
    this.router.navigate(['/travel-list']);
  }

  private handleError(error: any): void {
    console.error('Error saving booking:', error);
    // Show error message to user
  }

  onCancel(): void {
    this.router.navigate(['/travel-list']);
  }
} 