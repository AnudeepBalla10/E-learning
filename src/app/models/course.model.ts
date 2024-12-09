export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  topics: string[];
  thumbnail: string;
  progress?: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  videoUrl?: string;
  codeChallenge?: CodeChallenge;
}

export interface CodeChallenge {
  id: string;
  instructions: string;
  startingCode: string;
  solution: string;
  tests: TestCase[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}