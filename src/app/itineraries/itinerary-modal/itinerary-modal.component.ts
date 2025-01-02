import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Itinerary } from '../../models/itinerary.model';

@Component({
  selector: 'app-itinerary-modal',
  templateUrl: './itinerary-modal.component.html',
  styleUrls: ['./itinerary-modal.component.scss']
})
export class ItineraryModalComponent {
  itineraryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ItineraryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean; itinerary?: Itinerary }
  ) {
    this.itineraryForm = this.fb.group({
      TravelId: [data.itinerary?.TravelId || '', Validators.required],
      Day: [data.itinerary?.Day || '', [Validators.required, Validators.min(1)]],
      Activity: [data.itinerary?.Activity || '', Validators.required],
      StartTime: [data.itinerary?.StartTime || '', Validators.required],
      EndTime: [data.itinerary?.EndTime || '', Validators.required]
    });
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