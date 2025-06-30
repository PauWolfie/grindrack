import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  onLogin() {
    if (this.email && this.password) {
      console.log('Logging in with', this.email);
      this.router.navigate(['/dashboard']);
    }
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
}