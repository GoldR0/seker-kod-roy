import { User, Task, Event, Facility } from '../types';

// Demo Users
export const demoUsers: Record<string, User> = {
  'student@campus.ac.il': {
    id: '123456789',
    name: 'ישראל ישראלי',
    email: 'student@campus.ac.il',
    role: 'student',
    phone: '050-1234567',
    age: 22,
    city: 'תל אביב',
    gender: 'male'
  },
  'lecturer@campus.ac.il': {
    id: '987654321',
    name: 'ד"ר כהן',
    email: 'lecturer@campus.ac.il',
    role: 'lecturer',
    phone: '050-9876543',
    age: 45,
    city: 'ירושלים',
    gender: 'male'
  }
};

// Demo Events
export const demoEvents: Event[] = [
  {
    id: '1',
    title: 'מיטאפ יזמות',
    description: 'מפגש עם יזמים מובילים בתעשייה',
    date: '15/12',
    time: '18:00',
    roomId: 'A101',
    urgent: true
  },
  {
    id: '2',
    title: 'הרצאת אורח - AI',
    description: 'ד"ר כהן על בינה מלאכותית',
    date: '20/12',
    time: '14:00',
    roomId: 'B301',
    urgent: false
  },
  {
    id: '3',
    title: 'סדנת פיתוח',
    description: 'סדנה מעשית בפיתוח אפליקציות',
    date: '25/12',
    time: '10:00',
    roomId: 'C205',
    urgent: false
  },
  {
    id: '4',
    title: 'יום אטרקציות',
    description: 'יום כיף עם פעילויות מגוונות',
    date: '30/12',
    time: '09:00',
    roomId: 'D150',
    urgent: false
  }
];

// Demo Facilities
export const demoFacilities: Facility[] = [
  { 
    id: '1', 
    name: 'ספרייה', 
    status: 'open', 
    hours: '6:30-22:30',
    rating: 0,
    totalRatings: 0,
    averageRating: 0
  },
  { 
    id: '2', 
    name: 'קפיטריה', 
    status: 'busy', 
    hours: '7:00-22:00',
    rating: 0,
    totalRatings: 0,
    averageRating: 0
  },
  { 
    id: '3', 
    name: 'חדר כושר', 
    status: 'open', 
    hours: '6:30-8:00',
    rating: 0,
    totalRatings: 0,
    averageRating: 0
  },
  { 
    id: '4', 
    name: 'חניה', 
    status: 'busy', 
    hours: '24/7',
    rating: 0,
    totalRatings: 0,
    averageRating: 0
  }
];

// Demo Tasks
export const demoTasks: Task[] = [
  {
    id: '1',
    title: 'מבחן מתמטיקה',
    type: 'exam',
    course: 'מתמטיקה 1',
    dueDate: '2024-12-15',
    priority: 'urgent',
    status: 'pending'
  },
  {
    id: '2',
    title: 'מבחן פיזיקה',
    type: 'exam',
    course: 'פיזיקה 1',
    dueDate: '2024-12-15',
    priority: 'urgent',
    status: 'pending'
  },
  {
    id: '3',
    title: 'הגשת עבודה',
    type: 'assignment',
    course: 'תכנות מתקדם',
    dueDate: '2024-12-16',
    priority: 'medium',
    status: 'pending'
  }
];
