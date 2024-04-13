import { z } from "zod";
import { AnswerTest } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteAnswerTest } from "./schema";

export type InputType = z.infer<typeof DeleteAnswerTest>;
export type ReturnType = ActionState<InputType, AnswerTest>;
