import { z } from "zod";
import { AssignBlockGroup, Block } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateAssignBlockGroup } from "./schema";

export type InputType = z.infer<typeof CreateAssignBlockGroup>;
export type ReturnType = ActionState<InputType, AssignBlockGroup>;
