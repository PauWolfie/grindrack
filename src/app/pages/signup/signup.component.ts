import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) { }

  onSignUp() {
    if (this.password === this.confirmPassword) {
      console.log('Registering:', this.username, this.email);
      this.router.navigate(['/dashboard']);
    } else {
      alert('Passwords do not match');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}