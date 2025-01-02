import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Itinerary } from '../../models/itinerary.model';
import { TravelBookingService } from '../../services/travel-booking.service';

@Component({
  selector: 'app-itinerary-modal',
  templateUrl: './itinerary-modal.component.html',
  styleUrls: ['./itinerary-modal.component.scss']
})
export class ItineraryModalComponent implements OnInit {
  @Input() visible = false;
  @Input() isEditMode = false;
  @Input() itinerary?: Itinerary;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<any>();

  itineraryForm!: FormGroup;

  typeOptions = [
    { value: 'traveling', label: 'Traveling' },
    { value: 'stay', label: 'Stay/Accommodation' },
    { value: 'miscellaneous', label: 'Miscellaneous' }
  ];

  locations: any[] = [];

  travelByOptions = [
    { value: 'air', label: 'By Air' },
    { value: 'road', label: 'By Road' }
  ];

  constructor(private fb: FormBuilder,private travelBookingService: TravelBookingService) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.isEditMode && this.itinerary) {
      this.itineraryForm.patchValue(this.itinerary);
    }

    this.itineraryForm.get('Type')?.valueChanges.subscribe(type => {
      this.updateFormValidators(type);
    });

    this.loadLocations();
  }

  private initForm(): void {
    this.itineraryForm = this.fb.group({
      FromTime: ['', Validators.required],
      ToTime: ['', Validators.required],
      Type: ['', Validators.required],
      Description: ['', Validators.required],
      FromDestination: [''],
      ToDestination: [''],
      BookingId: [''],
      TravelBy: [''],
      Location: ['']
    });
  }

  private updateFormValidators(type: string): void {
    const form = this.itineraryForm;
    
    // Reset all optional fields
    ['FromDestination', 'ToDestination', 'BookingId', 'TravelBy', 'Location'].forEach(field => {
      const control = form.get(field);
      control?.clearValidators();
      control?.updateValueAndValidity();
    });

    // Add validators based on type
    switch (type) {
      case 'traveling':
        ['FromDestination', 'ToDestination', 'BookingId', 'TravelBy'].forEach(field => {
          form.get(field)?.setValidators(Validators.required);
        });
        break;
      case 'stay':
        ['Location', 'BookingId'].forEach(field => {
          form.get(field)?.setValidators(Validators.required);
        });
        break;
      case 'miscellaneous':
        form.get('Location')?.setValidators(Validators.required);
        break;
    }

    form.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.itineraryForm.valid) {
      const formData = this.itineraryForm.value;
      
      // Format time values to HH:mm
      const formatTime = (date: Date): string => {
        return date ? `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}` : '';
      };

      // Map form data to API format
      const apiData = {
        TravelId: 1,
        BookingId: 1,
        Day: 1,
        Activity: formData.Type,
        StartTime: formatTime(formData.FromTime),
        EndTime: formatTime(formData.ToTime),
        FromLocation: formData.Type === 'traveling' ? formData.FromDestination : formData.Location,
        ToLocation: formData.Type === 'traveling' ? formData.ToDestination : formData.Location,
        Description: formData.Description
      };

      this.save.emit(apiData);
      this.visible = false;
      this.visibleChange.emit(false);
    }
  }

  loadLocations(): void {
    this.travelBookingService.getAllLocations().subscribe({
      next: (locations) => {
        this.locations = locations;
      },
      error: (error) => {
        console.error('Error loading locations:', error);
      }
    });
  }


  onCancel(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }
} 