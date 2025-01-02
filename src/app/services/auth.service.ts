import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  logout() {
    // Clear all auth-related data
    localStorage.removeItem('access_token');
    localStorage.removeItem('userDetails');
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }

  getUserId(): number {
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    return userDetails?.user_id;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
} 