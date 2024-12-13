import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Actor } from '../actors';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-actors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-actors.component.html',
  styleUrls: ['./all-actors.component.scss'],
})
export class AllActorsComponent implements OnInit {
  public actors: Actor[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllActors();
  }

  getAllActors(): void {
    this.http.get<Actor[]>(`${environment.baseUrl}api/Actors`).subscribe({
      next: (actors) => {
        this.actors = actors;
      },
      error: (err) => {
        this.actors = [];
      },
    });
  }
  deleteActor(id: number): void {
    if (!this.authService.isAuthenticated()) {
      alert('You need to log in to delete movies.');
      this.router.navigate(['/login']);
      return;
    }
    if (confirm('Are you sure you want to delete this actor?')) {
      this.http.delete(`${environment.baseUrl}api/Actors/${id}`).subscribe({
        next: () => {
          this.actors = this.actors.filter((actor) => actor.id !== id);
        },
        error: (err) => {
          console.error(`Error deleting actor with ID ${id}:`, err);
        },
      });
    }
  }
}
