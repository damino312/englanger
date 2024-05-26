import { z } from "zod";
import { PronounceItem } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeletePronounceItem } from "./schema";

export type InputType = z.infer<typeof DeletePronounceItem>;
export type ReturnType = ActionState<InputType, PronounceItem>;
