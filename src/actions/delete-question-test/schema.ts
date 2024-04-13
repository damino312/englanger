import { z } from "zod";

export const DeleteQuestionTest = z.object({
  question_test_id: z.number(),
});
