import { z } from "zod";

export const FinishBlock = z.object({
  answer_array: z.array(
    z.object({
      question_id: z.number(),
      answer_id: z.number(),
    })
  ),
  student_id: z.number(),
  block_id: z.number(),
});
