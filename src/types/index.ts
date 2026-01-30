export interface Establishment {
  id: string;
  name: string;
  type: 'university' | 'college' | 'school' | 'institute'|'daara' ;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website?: string;
  responsableName?: string;
  responsablePhone?: string;
  studentCount: number;
  tutorCount: number;
  status: 'active' | 'inactive';
  createdAt: Date;
}

export interface Tutor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  establishmentId: string;
  establishmentName: string;
  status: 'active' | 'inactive';
  studentCount: number;
  avatar?: string;
  createdAt: Date;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: string;
  city: string;
  establishmentId: string;
  establishmentName: string;
  tutorId?: string;
  tutorName?: string;
  enrollmentDate: Date;
  status: 'enrolled' | 'graduated' | 'suspended';
  avatar?: string;
  createdAt: Date;
}

export interface AcademicItem {
  id: string;
  title: string;
  type: 'course' | 'homework' | 'exam' | 'tp'|'sourate';
  description: string;
  dueDate?: Date;
  establishmentId: string;
  tutorId: string;
  status: 'draft' | 'published' | 'completed';
  createdAt: Date;
}

export interface DashboardStats {
  totalEstablishments: number;
  totalTutors: number;
  totalStudents: number;
  activeItems: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'establishment' | 'tutor' | 'student' | 'academic';
  action: 'created' | 'updated' | 'deleted';
  title: string;
  timestamp: Date;
}
