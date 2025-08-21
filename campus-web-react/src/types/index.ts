export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'lecturer' | 'admin';
  phone?: string;
  age?: number;
  city?: string;
  gender?: 'male' | 'female';
}

export interface Task {
  id: string;
  title: string;
  type: 'exam' | 'assignment' | 'homework' | 'quiz' | 'presentation';
  course: string;
  dueDate: string;
  priority: 'urgent' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  urgent: boolean;
}

export interface Facility {
  id: string;
  name: string;
  status: 'open' | 'closed' | 'busy';
  hours: string;
  rating?: number;
  totalRatings?: number;
  averageRating?: number;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  credits: number;
  status: 'active' | 'completed' | 'upcoming';
  progress: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  major: string;
  year: number;
  gpa: number;
  courses: string[];
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  courseId?: string;
} 