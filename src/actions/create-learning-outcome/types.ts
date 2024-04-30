import { z } from "zod";
import { LearningOutcome } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateLearningOutcome } from "./schema";

export type InputType = z.infer<typeof CreateLearningOutcome>;
export type ReturnType = ActionState<InputType, LearningOutcome>;
