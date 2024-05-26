import { z } from "zod";

const onlyEnglishLetters = /^[1-9]+$/;

export const UpdatePronounceItem = z.object({
  pronounce_item_id: z.number(),
  name: z.string(),
  value: z.string(),
});
