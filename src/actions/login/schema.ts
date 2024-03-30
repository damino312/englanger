import { z } from "zod";

export const LoginUser = z.object({
  login: z.string(),
  password: z.string(),
});
