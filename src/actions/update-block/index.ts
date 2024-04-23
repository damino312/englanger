"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateBlock } from "./schema";
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
    const { name, block_id } = data;
    const updatedBlock = await db.block.update({
      where: {
        block_id: block_id,
      },
      data: {
        name: name,
      },
    });
    return { data: updatedBlock };
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось зарегистрировать пользователя",
    };
  }
};

export const updateBlock = createSafeAction(UpdateBlock, handler);
