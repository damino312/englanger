import { z } from "zod";

export const RegisterUser = z.object({
  login: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
});
