import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-movie',
  standalone: true, // Marking it as a standalone component
  imports: [ReactiveFormsModule], // Import ReactiveFormsModule
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss'],
})
export class EditMovieComponent implements OnInit {
  editMovieForm: FormGroup;
  movieId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.editMovieForm = this.fb.group({
      title: ['', Validators.required],
      releaseDate: ['', Validators.required],
      genre: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
    });

    this.movieId = 0;
  }

  ngOnInit(): void {
    const movieIdParam = this.route.snapshot.paramMap.get('id');
    if (movieIdParam) {
      this.movieId = +movieIdParam;
      this.loadMovieDetails(this.movieId);
    }
  }

  loadMovieDetails(movieId: number): void {
    this.http.get(`${environment.baseUrl}api/Movies/${movieId}`).subscribe({
      next: (movie: any) => {
        this.editMovieForm.patchValue({
          title: movie.title,
          releaseDate: movie.releaseDate,
          genre: movie.genre,
          rating: movie.rating,
        });
      },
      error: (err) => console.error(err),
    });
  }

  saveChanges(): void {
    if (this.editMovieForm.valid) {
      const updatedMovie = {
        id: this.movieId,
        ...this.editMovieForm.value,
        actors: [],
      };

      this.http
        .put(`${environment.baseUrl}api/Movies/${this.movieId}`, updatedMovie)
        .subscribe({
          next: () => {
            alert('Movie updated successfully!');
            this.router.navigate(['/movies']);
          },
          error: (err) => {
            console.error('Error updating movie:', err);
            alert('Failed to update the movie.');
          },
        });
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/movies']);
  }
}
