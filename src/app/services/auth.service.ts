import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7160/api/Auth'; // Substitua pela URL da sua API
  private tokenKey = 'authToken';
  public isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, { username, password });
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.isAuthenticated.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }
}
