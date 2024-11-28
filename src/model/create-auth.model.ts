import { z } from "zod";

export const AuthLoginSchema = z.object({
	username:z.string().min(1).max(25),
	password:z.string().min(1).max(100)
});