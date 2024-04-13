import { z } from "zod";

export const UpdateAnswerTest = z.object({
  answer_test_id: z.number(),
  order: z.number(),
  name: z.string(),
  is_answer: z.boolean(),
});
