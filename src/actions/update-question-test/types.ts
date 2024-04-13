import { z } from "zod";
import { QuestionTest } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateQuestionTest} from "./schema";

export type InputType = z.infer<typeof UpdateQuestionTest>;
export type ReturnType = ActionState<InputType, QuestionTest>;
