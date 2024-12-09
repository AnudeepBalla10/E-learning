import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="course-card scale-in" [class.has-progress]="course.progress !== undefined">
      <div class="thumbnail">
        <img [src]="course.thumbnail" [alt]="course.title">
        <div class="overlay">
          <button class="preview-btn">Preview Course</button>
        </div>
        @if (course.progress !== undefined) {
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress" [style.width.%]="course.progress"></div>
            </div>
            <span class="progress-text">{{course.progress}}% Complete</span>
          </div>
        }
      </div>
      <div class="content">
        <div class="header">
          <h3>{{course.title}}</h3>
          <span class="level" [class]="course.level">{{course.level}}</span>
        </div>
        <p class="description">{{course.description}}</p>
        <div class="meta">
          <span class="duration">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {{course.duration}} min
          </span>
          <span class="lessons">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
            </svg>
            12 Lessons
          </span>
        </div>
        <div class="topics">
          @for (topic of course.topics; track topic) {
            <span class="topic-tag">{{topic}}</span>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .course-card {
      background: var(--neutral-50);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      transition: all 0.3s ease;
      border: 1px solid var(--neutral-200);
    }

    @media (prefers-color-scheme: dark) {
      .course-card {
        background: var(--neutral-800);
        border-color: var(--neutral-700);
      }
    }

    .course-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .thumbnail {
      position: relative;
      padding-top: 56.25%;
      background: var(--neutral-200);
    }

    .thumbnail img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .course-card:hover .overlay {
      opacity: 1;
    }

    .preview-btn {
      background: var(--primary-500);
      color: white;
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-full);
      font-weight: 500;
      transform: translateY(10px);
      transition: all 0.3s ease;
    }

    .course-card:hover .preview-btn {
      transform: translateY(0);
    }

    .progress-container {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: var(--space-2);
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
      color: white;
    }

    .progress-bar {
      height: 4px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: var(--radius-full);
      overflow: hidden;
      margin-bottom: var(--space-1);
    }

    .progress {
      height: 100%;
      background: var(--primary-500);
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 0.875rem;
      opacity: 0.9;
    }

    .content {
      padding: var(--space-4);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--space-2);
      margin-bottom: var(--space-3);
    }

    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--neutral-900);
      flex: 1;
    }

    @media (prefers-color-scheme: dark) {
      h3 {
        color: var(--neutral-50);
      }
    }

    .level {
      font-size: 0.75rem;
      font-weight: 500;
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-full);
      text-transform: uppercase;
    }

    .level.beginner { background: var(--success); color: white; }
    .level.intermediate { background: var(--warning); color: var(--neutral-900); }
    .level.advanced { background: var(--error); color: white; }

    .description {
      color: var(--neutral-600);
      font-size: 0.875rem;
      margin-bottom: var(--space-4);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    @media (prefers-color-scheme: dark) {
      .description {
        color: var(--neutral-400);
      }
    }

    .meta {
      display: flex;
      gap: var(--space-4);
      margin-bottom: var(--space-4);
      color: var(--neutral-600);
      font-size: 0.875rem;
    }

    .meta span {
      display: flex;
      align-items: center;
      gap: var(--space-1);
    }

    .topics {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    .topic-tag {
      background: var(--primary-50);
      color: var(--primary-700);
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 500;
    }

    @media (prefers-color-scheme: dark) {
      .topic-tag {
        background: var(--primary-900);
        color: var(--primary-200);
      }
    }
  `]
})
export class CourseCardComponent {
  @Input() course!: Course;
}