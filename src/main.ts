import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { CourseCatalogComponent } from './app/components/course-catalog/course-catalog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CourseCatalogComponent],
  template: `
    <div class="app-container">
      <header class="app-header">
        <nav class="nav-container">
          <div class="logo">One Stop..System Design Guide</div>
          <div class="nav-links">
            <a href="/courses">Courses</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/profile">Profile</a>
          </div>
        </nav>
      </header>

      <main>
        <app-course-catalog></app-course-catalog>
      </main>

      <footer class="app-footer">
        <p>&copy; 2024 Angular Learning Platform. All rights reserved.</p>
      </footer>
    </div>
  `,
  styles: [
    `
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      background: var(--primary-color);
      color: white;
      padding: var(--spacing-unit) * 2;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .nav-links {
      display: flex;
      gap: var(--spacing-unit) * 3;
    }

    .nav-links a {
      color: white;
      text-decoration: none;
      padding: var(--spacing-unit);
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .nav-links a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    main {
      flex: 1;
      padding: var(--spacing-unit) * 2;
    }

    .app-footer {
      background: var(--background-dark);
      color: var(--text-dark);
      padding: var(--spacing-unit) * 2;
      text-align: center;
    }
  `,
  ],
})
export class App {
  name = 'Angular Learning Platform';
}

bootstrapApplication(App, {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/courses', pathMatch: 'full' },
      { path: 'courses', component: CourseCatalogComponent },
    ]),
  ],
});
