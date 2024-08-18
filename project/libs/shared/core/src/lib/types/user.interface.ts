export interface User {
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
  avatarUrl?: string;
  registrationDate: Date;
  subscribers: string[];
}
