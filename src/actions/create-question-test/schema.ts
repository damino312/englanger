import { z } from "zod";

export const CreateQuestionTest = z.object({
  subblock_test_id: z.number(),
  order: z.number(),
  block_id: z.number(),
});
