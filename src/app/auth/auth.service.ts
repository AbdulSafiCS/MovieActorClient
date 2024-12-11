import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from './login-response';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {} // Inject Router here

  private _authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  public authStatus = this._authStatus.asObservable();

  isAuthenticated(): boolean {
    return localStorage.getItem('tokenValue') !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('tokenValue');
  }

  private setAuthStatus(isAuthenticated: boolean): void {
    this._authStatus.next(isAuthenticated);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${environment.baseUrl}api/Admin/Login`,
        loginRequest
      )
      .pipe(
        tap((loginResult) => {
          if (loginResult.success) {
            localStorage.setItem('tokenValue', loginResult.token);
            this.setAuthStatus(true);
            this.router.navigate(['/movies']);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('tokenValue');
    this.setAuthStatus(false);
    this.router.navigate(['/movies']);
  }
}
