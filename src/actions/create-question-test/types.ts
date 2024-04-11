import { z } from "zod";
import { QuestionTest } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateQuestionTest } from "./schema";

export type InputType = z.infer<typeof CreateQuestionTest>;
export type ReturnType = ActionState<InputType, QuestionTest>;
