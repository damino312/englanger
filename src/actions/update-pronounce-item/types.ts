import { z } from "zod";
import { PronounceItem } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdatePronounceItem } from "./schema";

export type InputType = z.infer<typeof UpdatePronounceItem>;
export type ReturnType = ActionState<InputType, PronounceItem>;
