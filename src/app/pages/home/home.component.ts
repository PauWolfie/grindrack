import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  async logout() {
    await signOut(this.auth);
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}