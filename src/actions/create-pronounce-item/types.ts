import { z } from "zod";
import { PronounceItem } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreatePronounceItem } from "./schema";

export type InputType = z.infer<typeof CreatePronounceItem>;
export type ReturnType = ActionState<InputType, PronounceItem>;
