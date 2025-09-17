import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {
  private csrfToken: string | null = null;

  constructor(private http: HttpClient) {}

  getCsrfToken(): Observable<string> {
    if (this.csrfToken) {
      return of(this.csrfToken);
    }

    const cookieToken = this.getCsrfTokenFromCookie();
    if (cookieToken) {
      this.csrfToken = cookieToken;
      return of(cookieToken);
    }

    return this.http.get<{token: string}>('/api/csrf').pipe(
      map(response => {
        this.csrfToken = response.token;
        return response.token;
      }),
      catchError(() => of(''))
    );
  }

  private getCsrfTokenFromCookie(): string | null {
    const name = 'XSRF-TOKEN=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }
}
