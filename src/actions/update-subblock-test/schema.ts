import { z } from "zod";

export const UpdateSubblockTest = z.object({
  name: z.string(),
  subblock_test_id: z.number(),
});
