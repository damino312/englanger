"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBlock } from "./schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);
  if (!session?.user.user_id) {
    return {
      error: "Необходима авторизация",
    };
  }
  try {
    const { name } = data;
    const createdBlock = await db.block.create({
      data: {
        name,
        owner_id: Number(session.user.user_id),
      },
    });
    return { data: createdBlock };
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось зарегистрировать пользователя",
    };
  }
};

export const createBlock = createSafeAction(CreateBlock, handler);
