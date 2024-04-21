import { z } from "zod";
import { SubblockOrder } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateSubblockTest } from "./schema";

export type InputType = z.infer<typeof UpdateSubblockTest>;
export type ReturnType = ActionState<InputType, SubblockOrder>;
