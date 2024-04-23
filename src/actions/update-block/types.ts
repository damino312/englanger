import { z } from "zod";
import { Block } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { UpdateBlock } from "./schema";

export type InputType = z.infer<typeof UpdateBlock>;
export type ReturnType = ActionState<InputType, Block>;
