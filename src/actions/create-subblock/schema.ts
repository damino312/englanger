import { z } from "zod";

export const CreateSubblock = z.object({
  login: z.string(),
  password: z.string(),
});
