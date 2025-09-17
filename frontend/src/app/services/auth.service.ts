import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface User {
  name: string;
  authenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  checkAuthStatus(): Observable<User | null> {
    return this.http.get<User>('/api/me').pipe(
      map(user => user.authenticated ? user : null),
      tap(user => this.currentUserSubject.next(user))
    );
  }

  isAuthenticated(): boolean {
    const user = this.currentUserSubject.value;
    return user !== null && user.authenticated;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
