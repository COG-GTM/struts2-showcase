import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CsrfService } from '../../services/csrf.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Angular Frontend Integration Status</h5>
          </div>
          <div class="card-body">
            <div class="alert alert-success" role="alert">
              <h6 class="alert-heading">Integration Successful!</h6>
              <p>The Angular frontend is successfully integrated with the Struts2 showcase application.</p>
            </div>
            
            <h6>Authentication Status:</h6>
            <div class="mb-3">
              <span class="badge" [ngClass]="authStatus?.authenticated ? 'bg-success' : 'bg-warning'">
                {{ authStatus?.authenticated ? 'Authenticated' : 'Not Authenticated' }}
              </span>
              <span *ngIf="authStatus?.user" class="ms-2">
                User: {{ authStatus.user }}
              </span>
            </div>

            <h6>CSRF Protection:</h6>
            <div class="mb-3">
              <span class="badge" [ngClass]="csrfToken ? 'bg-success' : 'bg-warning'">
                {{ csrfToken ? 'CSRF Token Active' : 'No CSRF Token' }}
              </span>
              <small *ngIf="csrfToken" class="text-muted ms-2">
                Token: {{ csrfToken.substring(0, 10) }}...
              </small>
            </div>

            <h6>Integration Features:</h6>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Angular CLI Project Structure
                <span class="badge bg-success rounded-pill">✓</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Bootstrap/NG Bootstrap Integration
                <span class="badge bg-success rounded-pill">✓</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Proxy Configuration for /api requests
                <span class="badge bg-success rounded-pill">✓</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                CSRF Token HTTP Interceptor
                <span class="badge bg-success rounded-pill">✓</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Backend API Endpoints (/api/csrf, /api/me)
                <span class="badge bg-success rounded-pill">✓</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Maven Build Integration
                <span class="badge bg-success rounded-pill">✓</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h6 class="card-title">Quick Actions</h6>
          </div>
          <div class="card-body">
            <button class="btn btn-primary btn-sm me-2 mb-2" (click)="refreshAuth()">
              Refresh Auth Status
            </button>
            <button class="btn btn-secondary btn-sm mb-2" (click)="refreshCsrf()">
              Refresh CSRF Token
            </button>
            <hr>
            <a href="/struts2-showcase/" class="btn btn-outline-primary btn-sm" target="_blank">
              View Legacy App
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  authStatus: any = null;
  csrfToken: string | null = null;

  constructor(
    private authService: AuthService,
    private csrfService: CsrfService
  ) {}

  ngOnInit() {
    this.refreshAuth();
    this.refreshCsrf();
  }

  refreshAuth() {
    this.authService.checkAuthStatus().subscribe({
      next: (status) => {
        this.authStatus = status;
      },
      error: (error) => {
        console.error('Auth check failed:', error);
        this.authStatus = { authenticated: false, error: error.message };
      }
    });
  }

  refreshCsrf() {
    this.csrfService.getCsrfToken().subscribe({
      next: (token) => {
        this.csrfToken = token;
      },
      error: (error) => {
        console.error('CSRF token fetch failed:', error);
        this.csrfToken = null;
      }
    });
  }
}
