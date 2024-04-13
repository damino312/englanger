import { z } from "zod";

export const DeleteAnswerTest = z.object({
  answer_test_id: z.number(),
});
