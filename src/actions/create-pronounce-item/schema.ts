import { z } from "zod";

export const CreatePronounceItem = z.object({
  subblock_pronounce_id: z.number(),
});
