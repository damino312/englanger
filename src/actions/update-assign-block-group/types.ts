import { z } from "zod";
import { AssignBlockGroup } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateAssignBlockGroup } from "./schema";

export type InputType = z.infer<typeof UpdateAssignBlockGroup>;
export type ReturnType = ActionState<InputType, AssignBlockGroup>;
