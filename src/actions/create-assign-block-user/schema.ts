import { z } from "zod";

export const CreateAssignBlockUser = z.object({
  user_id: z.number(),
  assign_block_group_id: z.number(),
});
