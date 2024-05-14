import { z } from "zod";
import { SubblockPronounce } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateSubblockPronounce } from "./schema";

export type InputType = z.infer<typeof CreateSubblockPronounce>;
export type ReturnType = ActionState<InputType, SubblockPronounce>;
