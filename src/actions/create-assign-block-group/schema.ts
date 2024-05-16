import { z } from "zod";

export const CreateAssignBlockGroup = z.object({
  group_id: z.number(),
  block_id: z.number(),
  deadline: z.date(),
  max_try_count: z.number(),
  time_limit: z.number(),
});
