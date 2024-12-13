import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MovieComponent implements OnInit {
  public movies: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    var url = environment.baseUrl + 'api/Movies';
    this.http.get<any[]>(url).subscribe({
      next: (result) => {
        this.movies = result;
      },
      error: (e) => {
        console.error('Error fetching movies:', e);
      },
    });
  }

  deleteMovie(movieId: number): void {
    if (!this.authService.isAuthenticated()) {
      alert('You need to log in to delete movies.');
      this.router.navigate(['/login']);
      return;
    }

    if (confirm('Are you sure you want to delete this movie?')) {
      this.http
        .delete(`${environment.baseUrl}api/Movies/${movieId}`)
        .subscribe({
          next: () => {
            alert('Movie deleted successfully!');
            this.getMovies();
          },
          error: (e) => {
            console.error('Error deleting movie:', e);
            alert('Failed to delete the movie.');
          },
        });
    }
  }

  editMovie(movieId: number): void {
    if (!this.authService.isAuthenticated()) {
      alert('You need to log in to edit movies.');
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate([`/movies/${movieId}/edit`]);
  }
}
