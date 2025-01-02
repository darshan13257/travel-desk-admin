import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../types/auth.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // If you don't have a local image, you can use this temporarily
    const imgElement = document.querySelector('.login-image-section') as HTMLElement;
    if (imgElement) {
      imgElement.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?travel,business")';
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginUrl = `${environment.apiUrl}/login/login/access-token`;
      
      // Create FormData object
      const formData = new FormData();
      formData.append('username', this.loginForm.get('username')?.value);
      formData.append('password', this.loginForm.get('password')?.value);

      this.http.post<LoginResponse>(loginUrl, formData)
        .subscribe({
          next: (response) => {
            localStorage.setItem('userDetails', JSON.stringify(response));
            localStorage.setItem('access_token', response.access_token);
            this.router.navigate(['/travel-list']);
          },
          error: (error) => {
            console.error('Login failed:', error);
            // Add error handling here
          }
        });
    }
  }
} 