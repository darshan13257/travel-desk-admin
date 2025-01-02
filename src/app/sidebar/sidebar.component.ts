import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = [
    {
      title: 'Travel Details',
      icon: 'fas fa-plane',
      route: '/travel-list'
    },
    {
      title: 'Itineraries',
      icon: 'fas fa-route',
      route: '/itineraries'
    },
    {
      title: 'Expense Tracking',
      icon: 'fas fa-receipt',
      route: '/expenses'
    }
  ];

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
} 