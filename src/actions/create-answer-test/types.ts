import { z } from "zod";
import { AnswerTest } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateAnswerTest } from "./schema";

export type InputType = z.infer<typeof CreateAnswerTest>;
export type ReturnType = ActionState<InputType, AnswerTest>;
