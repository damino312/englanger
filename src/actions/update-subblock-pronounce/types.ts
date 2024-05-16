import { z } from "zod";
import { SubblockPronounce } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateSubblockPronounce } from "./schema";

export type InputType = z.infer<typeof UpdateSubblockPronounce>;
export type ReturnType = ActionState<InputType, SubblockPronounce>;
