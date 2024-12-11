import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';
import { Actor } from './actors';

@Component({
  selector: 'app-actors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent implements OnInit {
  public actors: Actor[] = [];
  public movieTitle: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      console.log('Fetching actors for Movie ID:', movieId); // Debugging log
      this.getActorsByMovieId(+movieId);
    }
  }

  getActorsByMovieId(movieId: number): void {
    this.http
      .get<Actor[]>(`${environment.baseUrl}api/Movies/${movieId}/actors`)
      .subscribe({
        next: (actors) => {
          console.log('Actors API Response:', actors); // Log the response
          if (actors && actors.length > 0) {
            this.movieTitle = actors[0].movieTitle || 'Unknown Movie';
          } else {
            this.movieTitle = 'No Movie Found';
          }
          this.actors = actors;
          console.log('Actors API Response:', actors);
        },
        error: (err) => {
          console.error('Error fetching actors:', err);
          this.movieTitle = 'Error Fetching Data';
          this.actors = [];
        },
      });
  }
}