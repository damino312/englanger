import { z } from "zod";

export const UpdateAnswerTest = z.object({
  answer_test_id: z.number(),
  order: z.number(),
  name: z.string(),
  is_answer: z.boolean(),
  question_test_id: z.number(),
  is_changing_right_answer: z.boolean(),
});
