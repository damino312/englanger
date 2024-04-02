import { z } from "zod";
import { Block } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateBlock } from "./schema";

export type InputType = z.infer<typeof CreateBlock>;
export type ReturnType = ActionState<InputType, Block>;
