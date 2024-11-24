export interface User {
  id?: number;
  name: string;
  username: string;
  token?: string;
  email: string;
  password: string;
  picture?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
