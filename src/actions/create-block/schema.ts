import { z } from "zod";

export const CreateBlock = z.object({
  name: z.string(),
});
