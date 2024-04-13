import { z } from "zod";
import { QuestionTest } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteQuestionTest} from "./schema";

export type InputType = z.infer<typeof DeleteQuestionTest>;
export type ReturnType = ActionState<InputType, QuestionTest>;
