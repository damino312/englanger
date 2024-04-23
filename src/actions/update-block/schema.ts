import { z } from "zod";

export const UpdateBlock = z.object({
  name: z.string(),
  block_id: z.number(),
});
