import { z } from "zod";

export const DeletePronounceItem = z.object({
  pronounce_item_id: z.number(),
});
