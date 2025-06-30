import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from '@angular/fire/auth';
import { PopupService } from '../../services/popup/popup.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private auth: Auth,
    private popup: PopupService
  ) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) this.router.navigate(['/home']);
    });
  }

  ngOnInit() { }

  async onLogin() {
    if (this.email && this.password) {
      try {
        await setPersistence(this.auth, browserLocalPersistence);
        this.router.navigate(['/home']);
      } catch (error) {
        this.popup.showError('Login failed', (error as Error).message);
      }
    } else {
      this.popup.showWarning('Missing fields', 'Please enter your email and password');
    }
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
}