import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TravelBooking } from '../../models/travel-booking.model';

@Component({
  selector: 'app-travel-modal',
  templateUrl: './travel-modal.component.html',
  styleUrls: ['./travel-modal.component.scss']
})
export class TravelModalComponent {
  bookingForm: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TravelModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { booking: TravelBooking | null }
  ) {
    this.isEdit = !!data.booking;
    this.bookingForm = this.fb.group({
      EmployeeID: ['', Validators.required],
      AdminID: ['', Validators.required],
      TravelMode: ['Flight', Validators.required],
      ProviderName: ['', Validators.required],
      BookingReference: ['', Validators.required],
      destination: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      TotalCost: ['', [Validators.required, Validators.min(0)]],
      Status: ['Booked', Validators.required]
    });

    if (this.isEdit && data.booking) {
      this.bookingForm.patchValue({
        ...data.booking,
        StartDate: this.formatDate(data.booking.StartDate),
        EndDate: this.formatDate(data.booking.EndDate)
      });
    }
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const formValue = {
        ...this.bookingForm.value,
        StartDate: new Date(this.bookingForm.value.StartDate),
        EndDate: new Date(this.bookingForm.value.EndDate)
      };
      this.dialogRef.close(formValue);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
