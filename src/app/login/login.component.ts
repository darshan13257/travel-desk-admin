import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
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
      // Add your authentication logic here
      
      // After successful login, navigate to travel-list
      this.router.navigate(['/travel-list']).then(() => {
        // Optional: Reload the page to ensure all components are properly initialized
        // window.location.reload();
      });
    }
  }
} 