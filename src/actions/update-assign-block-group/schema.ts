import { z } from "zod";

export const UpdateAssignBlockGroup = z.object({
  assign_block_group_id: z.number(),
  deadline: z.date(),
  max_try_count: z.number(),
  time_limit: z.number(),
});
