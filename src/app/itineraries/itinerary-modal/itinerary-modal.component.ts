import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Itinerary } from '../../models/itinerary.model';

@Component({
  selector: 'app-itinerary-modal',
  templateUrl: './itinerary-modal.component.html',
  styleUrls: ['./itinerary-modal.component.scss']
})
export class ItineraryModalComponent implements OnInit {
  itineraryForm!: FormGroup;
  isEditMode: boolean;

  typeOptions = [
    { value: 'traveling', label: 'Traveling' },
    { value: 'stay', label: 'Stay/Accommodation' },
    { value: 'miscellaneous', label: 'Miscellaneous' }
  ];

  travelByOptions = [
    { value: 'air', label: 'By Air' },
    { value: 'road', label: 'By Road' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ItineraryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { travelId: number; itinerary?: Itinerary }
  ) {
    this.isEditMode = !!data.itinerary;
    this.initForm();
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.itinerary) {
      this.itineraryForm.patchValue(this.data.itinerary);
    }

    // Subscribe to type changes to handle dynamic fields
    this.itineraryForm.get('Type')?.valueChanges.subscribe(type => {
      this.updateFormValidators(type);
    });
  }

  private initForm(): void {
    this.itineraryForm = this.fb.group({
      TravelId: [this.data.travelId],
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
      this.dialogRef.close(this.itineraryForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 