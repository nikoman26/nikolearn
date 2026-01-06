import { Lesson, UserProfile, UserRole } from './types';

export const MOCK_USER: UserProfile = {
  id: 'cbc-grade6-student',
  name: 'Grade 6 Student',
  role: UserRole.Student,
  coins: 485,
  streak: 7,
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grade6Student&backgroundColor=b6e3f4'
};

export const MOCK_LESSONS: Lesson[] = [
  {
    id: 'cbc-lesson-1-body-systems',
    title: 'Introduction to Body Systems',
    subject: 'Science',
    strand: 'Living Things and Their Environment',
    durationMinutes: 40,
    isLocked: false,
    progress: 85,
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cbc-lesson-2-blood-vessels',
    title: 'Blood and Blood Vessels',
    subject: 'Science',
    strand: 'Living Things and Their Environment',
    durationMinutes: 40,
    isLocked: false,
    progress: 72,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cbc-lesson-3-healthy-living',
    title: 'Healthy Living & Lifestyle',
    subject: 'Science',
    strand: 'Living Things and Their Environment',
    durationMinutes: 40,
    isLocked: false,
    progress: 45,
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'l2',
    title: 'Photosynthesis',
    subject: 'Science',
    strand: 'Living Things',
    durationMinutes: 20,
    isLocked: true,
    progress: 0,
    imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=400'
  }
];
