export interface ServiceType {
  _id: string;
  name: string;
  description: string;
  logo: string;
  icon?: string;
  tagline?: string;
}

export interface DoctorType {
  _id: string;
  name: string;
  age: number;
  service: ServiceType;
  location: string;
  password?: string;
  userName: string;
  email: string;
  phone: string | number;
  rating?: number;
  reviewsCount?: number;
  experience?: string;
  avatar?: string;
  availableDays?: string[];
}

export interface AppointmentType {
  _id?: string;
  patientName: string;
  patientId: string;
  doctor: string | DoctorType;
  age?: number;
  illness: string;
  date: string | Date;
  timeSlot?: string;
  email?: string;
  phone?: string;
  status?: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  createdAt?: string;
}
