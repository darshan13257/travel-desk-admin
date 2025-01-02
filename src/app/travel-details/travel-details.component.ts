import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TravelBookingService } from '../services/travel-booking.service';
import { TravelBooking } from '../models/travel-booking.model';

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.component.html',
  styleUrls: ['./travel-details.component.scss']
})
export class TravelDetailsComponent implements OnInit {
  travelForm: FormGroup;
  isEditMode = false;
  travelId?: number;

  constructor(
    private fb: FormBuilder,
    private travelBookingService: TravelBookingService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.travelForm = this.fb.group({
      TravelType: ['', Validators.required],
      Purpose: ['', Validators.required],
      Source: ['', Validators.required],
      Destination: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Status: ['Pending'],
      Description: ['']
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
      this.travelBookingService.getBooking(this.travelId).subscribe(booking => {
        this.travelForm.patchValue(booking);
      });
    }
  }

  onSubmit(): void {
    if (this.travelForm.valid) {
      const booking: TravelBooking = this.travelForm.value;
      
      const request = this.isEditMode && this.travelId
        ? this.travelBookingService.updateBooking(this.travelId, booking)
        : this.travelBookingService.createBooking(booking);

      request.subscribe({
        next: (response) => {
          // Navigate to itineraries tab
          this.router.navigate(['../itineraries'], { 
            relativeTo: this.route,
            queryParams: { id: response.TravelId }
          });
        },
        error: (error) => {
          console.error('Error saving travel booking:', error);
        }
      });
    }
  }
} 