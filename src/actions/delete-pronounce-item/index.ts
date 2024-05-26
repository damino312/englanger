"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeletePronounceItem } from "./schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidateTag } from "next/cache";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);
  if (!session?.user.user_id) {
    return {
      error: "Необходима авторизация",
    };
  }
  const { pronounce_item_id } = data;
  try {
    const deletedPronounceItem = await db.pronounceItem.delete({
      where: {
        pronounce_item_id,
      },
    });
    revalidateTag("pronounceItems");
    return { data: deletedPronounceItem };
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось создать вопрос",
    };
  }
};

export const deletePronounceItem = createSafeAction(
  DeletePronounceItem,
  handler
);
