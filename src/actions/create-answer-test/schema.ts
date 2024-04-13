import { z } from "zod";

export const CreateAnswerTest = z.object({
  question_test_id: z.number(),
  order: z.number(),
});
