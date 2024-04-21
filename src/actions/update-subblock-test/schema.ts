import { z } from "zod";

export const UpdateSubblockTest = z.object({
  name: z.string(),
  subblock_order_id: z.number(),
  order: z.number(),
});
