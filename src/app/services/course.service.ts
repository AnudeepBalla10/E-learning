import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    {
      id: '1',
      title: 'System Design Fundamentals',
      description: 'Master the basics of System Design',
      level: 'beginner',
      duration: 120,
      topics: ['Components', 'Services', 'Routing'],
      thumbnail: 'assets/courses/angular-fundamentals.jpg'
    },
    // More courses will be added here
  ];

  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  getCourseById(id: string): Observable<Course | undefined> {
    return of(this.courses.find(course => course.id === id));
  }

  searchCourses(query: string): Observable<Course[]> {
    const lowercaseQuery = query.toLowerCase();
    return of(this.courses.filter(course => 
      course.title.toLowerCase().includes(lowercaseQuery) ||
      course.description.toLowerCase().includes(lowercaseQuery)
    ));
  }
}