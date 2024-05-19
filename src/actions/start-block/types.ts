import { z } from "zod";
import { AssignBlockUsers } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { StartBlock } from "./schema";

export type InputType = z.infer<typeof StartBlock>;
export type ReturnType = ActionState<InputType, AssignBlockUsers>;
