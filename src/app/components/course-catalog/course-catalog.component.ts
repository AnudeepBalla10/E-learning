import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { CourseCardComponent } from '../course-card/course-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent],
  template: `
    <div class="course-catalog container">
      <header class="catalog-header">
        <div class="header-content">
          <h1>One Stop..System Design Guide Courses</h1>
          <p class="subtitle">Level up your System Design with our expert-led courses</p>
        </div>
        
        <div class="search-section">
          <div class="search-bar">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="search" 
              [(ngModel)]="searchQuery"
              (input)="onSearch()"
              placeholder="Search for courses..."
              class="search-input"
            />
          </div>
          
          <div class="filters">
            <button 
              *ngFor="let level of levels"
              (click)="filterByLevel(level)"
              [class.active]="selectedLevel === level"
              class="filter-btn">
              {{level}}
            </button>
          </div>
        </div>
      </header>

      <div class="courses-grid">
        <app-course-card
          *ngFor="let course of filteredCourses"
          [course]="course"
        ></app-course-card>
      </div>
    </div>
  `,
  styles: [
    `
    .course-catalog {
      padding: var(--space-8) 0;
    }

    .catalog-header {
      margin-bottom: var(--space-8);
    }

    .header-content {
      text-align: center;
      margin-bottom: var(--space-8);
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: var(--space-2);
      background: linear-gradient(135deg, var(--primary-500), var(--accent-500));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      font-size: 1.125rem;
      color: var(--neutral-600);
    }

    @media (prefers-color-scheme: dark) {
      .subtitle {
        color: var(--neutral-400);
      }
    }

    .search-section {
      max-width: 800px;
      margin: 0 auto;
    }

    .search-bar {
      position: relative;
      margin-bottom: var(--space-4);
    }

    .search-bar svg {
      position: absolute;
      left: var(--space-4);
      top: 50%;
      transform: translateY(-50%);
      color: var(--neutral-500);
    }

    .search-input {
      width: 100%;
      padding: var(--space-4) var(--space-4) var(--space-4) var(--space-12);
      background: var(--neutral-100);
      border: 1px solid var(--neutral-200);
      border-radius: var(--radius-full);
      transition: all 0.2s ease;
    }

    @media (prefers-color-scheme: dark) {
      .search-input {
        background: var(--neutral-800);
        border-color: var(--neutral-700);
      }
    }

    .search-input:focus {
      outline: none;
      border-color: var(--primary-500);
      box-shadow: 0 0 0 3px var(--primary-100);
    }

    .filters {
      display: flex;
      justify-content: center;
      gap: var(--space-2);
      margin-bottom: var(--space-8);
    }

    .filter-btn {
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-full);
      background: var(--neutral-100);
      color: var(--neutral-700);
      font-weight: 500;
      transition: all 0.2s ease;
      border: 1px solid var(--neutral-200);
    }

    @media (prefers-color-scheme: dark) {
      .filter-btn {
        background: var(--neutral-800);
        border-color: var(--neutral-700);
        color: var(--neutral-300);
      }
    }

    .filter-btn:hover {
      background: var(--neutral-200);
    }

    .filter-btn.active {
      background: var(--primary-500);
      color: white;
      border-color: var(--primary-600);
    }

    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: var(--space-6);
    }

    @media (max-width: 640px) {
      .courses-grid {
        grid-template-columns: 1fr;
      }
      
      h1 {
        font-size: 2rem;
      }
      
      .subtitle {
        font-size: 1rem;
      }
    }
  `,
  ],
})
export class CourseCatalogComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchQuery = '';
  selectedLevel: string = '';
  levels = ['beginner', 'intermediate', 'advanced'];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filteredCourses = courses;
    });
  }

  onSearch() {
    this.filterCourses();
  }

  filterByLevel(level: string) {
    this.selectedLevel = this.selectedLevel === level ? '' : level;
    this.filterCourses();
  }

  private filterCourses() {
    this.filteredCourses = this.courses.filter((course) => {
      const matchesSearch =
        !this.searchQuery ||
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.description
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());

      const matchesLevel =
        !this.selectedLevel || course.level === this.selectedLevel;

      return matchesSearch && matchesLevel;
    });
  }
}
