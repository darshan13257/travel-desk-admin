import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-travel-form-layout',
  templateUrl: './travel-form-layout.component.html',
  styleUrls: ['./travel-form-layout.component.scss']
})
export class TravelFormLayoutComponent {
  menuItems = [
    {
      title: 'Travel Details',
      icon: 'fas fa-plane',
      route: './details'
    },
    {
      title: 'Itineraries',
      icon: 'fas fa-route',
      route: './itineraries'
    },
    {
      title: 'Expense Tracking',
      icon: 'fas fa-receipt',
      route: './expenses'
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
} 