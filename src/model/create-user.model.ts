import { z } from 'zod';

export const createUserSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(100),
  username: z.string().min(1).max(100),
  token: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  picture: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
