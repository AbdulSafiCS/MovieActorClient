import { Routes } from '@angular/router';
import { MovieComponent } from './movies/movies.component';
import { ActorsComponent } from './actors/actors.component';
import { LoginComponent } from './auth/login.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { AllActorsComponent } from './actors/all-actors/all-actors.component';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'actors', component: ActorsComponent },
  { path: 'movies', component: MovieComponent },
  { path: 'movies/:id/edit', component: EditMovieComponent },
  { path: 'movies/:id/actors', component: ActorsComponent },
  { path: 'all-actors', component: AllActorsComponent },
  { path: 'login', component: LoginComponent },
];
