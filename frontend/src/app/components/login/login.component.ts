import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Authentication Required</h5>
          </div>
          <div class="card-body">
            <div class="alert alert-info" role="alert">
              <h6 class="alert-heading">Login via Struts2</h6>
              <p>Authentication is handled by the existing Struts2 application. Please use the legacy login system.</p>
            </div>
            
            <div class="d-grid gap-2">
              <a href="/struts2-showcase/login" class="btn btn-primary">
                Go to Struts2 Login
              </a>
              <a href="/struts2-showcase/" class="btn btn-outline-secondary">
                Back to Legacy App
              </a>
            </div>
            
            <hr>
            <small class="text-muted">
              This Angular frontend integrates with the existing Struts2 authentication system. 
              Session management and login are handled by the backend application.
            </small>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
}
