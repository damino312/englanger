import { z } from "zod";

export const CreateSubblockTest = z.object({
  name: z.string(),
  subblockTypeId: z.number(),
  order: z.number(),
  blockId: z.number(),
});
