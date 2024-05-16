import { z } from "zod";
import { LearningOutcome } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { FinishBlock } from "./schema";

export type InputType = z.infer<typeof FinishBlock>;
export type ReturnType = ActionState<InputType, LearningOutcome>;
