import { z } from "zod";

export const DeleteBlock = z.object({
  block_id: z.number(),
});
