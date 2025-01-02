import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showProfileMenu = false;
  username = 'John Doe'; // Replace with actual user data

  constructor(private router: Router,private authService: AuthService) {}

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  onEditProfile(): void {
    // Implement edit profile logic
    this.showProfileMenu = false;
  }

  onLogout(): void {
    // Implement logout logic
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Close menu when clicking outside
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-section')) {
      this.showProfileMenu = false;
    }
  }
} 