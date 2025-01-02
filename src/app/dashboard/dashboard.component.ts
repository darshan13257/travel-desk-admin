import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  navigateToBooking(type: string) {
    switch(type) {
      case 'flight':
        this.router.navigate(['/book-flight']);
        break;
      case 'hotel':
        this.router.navigate(['/book-hotel']);
        break;
      case 'car':
        this.router.navigate(['/book-car']);
        break;
    }
  }
} 