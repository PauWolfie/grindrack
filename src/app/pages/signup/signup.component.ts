import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { PopupService } from '../../services/popup/popup.service';

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

  showPassword: boolean = false;
  showConfirm: boolean = false;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private auth: Auth,
    private popup: PopupService
  ) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmVisibility() {
    this.showConfirm = !this.showConfirm;
  }

  onSignUp() {
    if (!this.correctFormat()) return;
    this.storeUser();
  }

  correctFormat() {
    if (this.password !== this.confirmPassword) {
      this.popup.showWarning('Passwords do not match', 'Please check the fields and try again');
      return false;
    }

    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.popup.showWarning('Missing fields', 'Please fill in all fields');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.popup.showWarning('Invalid email format', 'Please enter a valid email address');
      return false;
    }

    return true;
  }

  async storeUser() {
    try {
      await this.createUserInAuth();

      const user = {
        username: this.username,
        email: this.email
      };

      const usersRef = collection(this.firestore, 'users');
      await addDoc(usersRef, user);

      this.popup.showSuccess('Registration successful', 'Your account has been created');
      this.router.navigate(['/home']);
    } catch (error) {
      this.popup.showError('User registration failed', (error as Error).message);
    }
  }

  async createUserInAuth() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );
      console.log('Authenticated user ID:', userCredential.user.uid);
    } catch (error) {
      this.popup.showError('Authentication error', (error as Error).message);
      throw error;
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}