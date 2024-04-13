import { z } from "zod";

export const DeleteSubblock = z.object({
  subblock_id: z.number(),
  type: z.number(),
});
