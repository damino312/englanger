"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteBlock } from "./schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);
  if (!session?.user.user_id) {
    return {
      error: "Необходима авторизация",
    };
  }
  const { block_id } = data;

  try {
    const deletedBlock = await db.block.delete({
      where: {
        block_id: block_id,
      },
    });
    revalidateTag("blocks");
    return { data: deletedBlock };
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось удалить блок",
    };
  }
};

export const deleteBlock = createSafeAction(DeleteBlock, handler);
