import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { Actor } from '../actors';

@Component({
  selector: 'app-all-actors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-actors.component.html',
  styleUrls: ['./all-actors.component.scss'],
})
export class AllActorsComponent implements OnInit {
  public actors: Actor[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllActors();
  }

  getAllActors(): void {
    this.http.get<Actor[]>(`${environment.baseUrl}api/Actors`).subscribe({
      next: (actors) => {
        console.log('All Actors API Response:', actors);
        this.actors = actors;
      },
      error: (err) => {
        console.error('Error fetching all actors:', err);
        this.actors = [];
      },
    });
  }
  deleteActor(id: number): void {
    if (confirm('Are you sure you want to delete this actor?')) {
      this.http.delete(`${environment.baseUrl}api/Actors/${id}`).subscribe({
        next: () => {
          console.log(`Actor with ID ${id} deleted successfully.`);
          // Update the actors list by filtering out the deleted actor
          this.actors = this.actors.filter((actor) => actor.id !== id);
        },
        error: (err) => {
          console.error(`Error deleting actor with ID ${id}:`, err);
        },
      });
    }
  }
}
