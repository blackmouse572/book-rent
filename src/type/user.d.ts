export interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  password?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
