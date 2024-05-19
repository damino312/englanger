import { z } from "zod";

export const UpdateSubblockPronounce = z.object({
  subblock_pronounce_id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
});
