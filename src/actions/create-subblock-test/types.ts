import { z } from "zod";
import { SubblockTest } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateSubblockTest } from "./schema";

export type InputType = z.infer<typeof CreateSubblockTest>;
export type ReturnType = ActionState<InputType, SubblockTest>;
