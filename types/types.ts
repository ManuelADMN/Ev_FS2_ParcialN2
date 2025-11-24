
export interface Service {
  title: string;
  description: string;
  icon: string;
  projectName?: string;
}

export interface TeamMember {
  id: string;
  imageUrl: string;
  name: string;
  title: string;
  followers: number;
  posts: number;
  bio: string;
  skills: string[];
}

export type UserRole = 'Admin' | 'User';
export type UserStatus = 'Active' | 'Suspended';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Optional for display, required for auth
  role: UserRole;
  status: UserStatus;
}
