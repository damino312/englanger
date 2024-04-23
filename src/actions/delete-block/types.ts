import { z } from "zod";
import { Block } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteBlock } from "./schema";

export type InputType = z.infer<typeof DeleteBlock>;
export type ReturnType = ActionState<InputType, Block>;
