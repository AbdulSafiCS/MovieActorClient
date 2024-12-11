import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './auth/auth.interceptor';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MovieActor';
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
