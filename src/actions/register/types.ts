import { z } from "zod";
import { User } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { RegisterUser } from "./schema";

export type InputType = z.infer<typeof RegisterUser>;
export type ReturnType = ActionState<InputType, User>;
