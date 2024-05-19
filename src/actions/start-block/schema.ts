import { z } from "zod";

export const StartBlock = z.object({
  user_id: z.number(),
  assign_block_group_id: z.number(),
  action: z.enum(["create", "update"]),
});
