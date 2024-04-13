import { z } from "zod";
import { AnswerTest, SubblockOrder } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteSubblock } from "./schema";

export type InputType = z.infer<typeof DeleteSubblock>;
export type ReturnType = ActionState<InputType, SubblockOrder>;
