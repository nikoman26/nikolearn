import { Lesson, UserProfile, UserRole } from './types';

export const MOCK_USER: UserProfile = {
  id: 'u1',
  name: 'Kamau Otieno',
  role: UserRole.Student,
  coins: 450,
  streak: 5,
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kamau&backgroundColor=b6e3f4'
};

export const MOCK_LESSONS: Lesson[] = [
  {
    id: 'l1',
    title: 'Photosynthesis',
    subject: 'Science',
    strand: 'Living Things',
    durationMinutes: 20,
    isLocked: false,
    progress: 65,
    imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'l2',
    title: 'The Solar System',
    subject: 'Social Studies',
    strand: 'Our Universe',
    durationMinutes: 15,
    isLocked: false,
    progress: 30,
    imageUrl: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'l3',
    title: 'Digital Literacy',
    subject: 'Technology',
    strand: 'Using Devices',
    durationMinutes: 10,
    isLocked: true,
    progress: 0,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'l4',
    title: 'Kenyan Agriculture',
    subject: 'Science',
    strand: 'Environment',
    durationMinutes: 25,
    isLocked: false,
    progress: 10,
    imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=400'
  }
];
