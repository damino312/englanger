import { z } from "zod";

export const UpdateQuestionTest = z.object({
  question_test_id: z.number(),
  order: z.number(),
  question: z.string(),
  block_id: z.number(),
});
