// import { Routes } from '@angular/router';
// import { CountryComponent } from './country/country.component';
// import { CityComponent } from './city/city.component';
// import { WeatherComponent } from './weather/weather.component';
// import { CountryPopulationComponent } from './country/country-population.component';
// import { LoginComponent } from './auth/login.component';

// export const routes: Routes = [
//     {path: "countries", component: CountryComponent},
//     {path: "cities", component: CityComponent},
//     {path: "country-population/:id", component: CountryPopulationComponent},
//     {path: "", component: WeatherComponent, pathMatch: "full"},
//     {path: "login", component: LoginComponent}
// ];

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
