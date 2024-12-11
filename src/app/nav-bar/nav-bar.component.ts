import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to authStatus observable
    this.authService.authStatus.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
