import { z } from "zod";
import { AnswerTest } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateAnswerTest } from "./schema";

export type InputType = z.infer<typeof UpdateAnswerTest>;
export type ReturnType = ActionState<InputType, AnswerTest>;
