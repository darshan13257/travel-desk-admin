import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TravelBookingService } from '../services/travel-booking.service';
import { TravelBooking, TravelBookingResponse } from '../models/travel-booking.model';

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.component.html',
  styleUrls: ['./travel-details.component.scss']
})
export class TravelDetailsComponent implements OnInit {
  travelForm!: FormGroup;
  isEditMode = false;
  travelId?: number;

  constructor(
    private fb: FormBuilder,
    private travelBookingService: TravelBookingService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.travelForm = this.fb.group({
      TravelMode: ['', Validators.required],
      ProviderName: ['', Validators.required],
      BookingReference: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      TotalCost: [0, Validators.required],
      Status: ['To be approved'],
      FromLocationId: ['', Validators.required],
      ToLocationId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.travelId = +params['id'];
        this.loadTravelDetails();
      }
    });
  }

  loadTravelDetails(): void {
    if (this.travelId) {
      this.travelBookingService.getBooking(this.travelId).subscribe({
        next: (response: TravelBookingResponse) => {
          const booking = response.Booking;
          this.travelForm.patchValue({
            TravelMode: booking.TravelMode,
            ProviderName: booking.ProviderName,
            BookingReference: booking.BookingReference,
            StartDate: booking.StartDate,
            EndDate: booking.EndDate,
            TotalCost: booking.TotalCost,
            Status: booking.Status,
            FromLocationId: booking.FromLocation.Id,
            ToLocationId: booking.ToLocation.Id
          });
        },
        error: (error: any) => {
          console.error('Error loading travel details:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.travelForm.valid) {
      const bookingData: TravelBooking = this.travelForm.value;
      
      const request = this.isEditMode && this.travelId
        ? this.travelBookingService.updateBooking(this.travelId, bookingData)
        : this.travelBookingService.createBooking(bookingData);

      request.subscribe({
        next: (response: TravelBookingResponse) => {
          this.router.navigate(['../itineraries'], { 
            relativeTo: this.route,
            queryParams: { id: response.Booking.TravelId }
          });
        },
        error: (error: any) => {
          console.error('Error saving travel booking:', error);
        }
      });
    }
  }
} 