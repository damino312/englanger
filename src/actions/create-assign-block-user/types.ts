import { z } from "zod";
import { AssignBlockUsers } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateAssignBlockUser } from "./schema";

export type InputType = z.infer<typeof CreateAssignBlockUser>;
export type ReturnType = ActionState<InputType, AssignBlockUsers>;
