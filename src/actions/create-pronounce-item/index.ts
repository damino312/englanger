"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreatePronounceItem } from "./schema";
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
  const { subblock_pronounce_id } = data;
  try {
    const pronounceItemsOfSubblock = await db.pronounceItem.count({
      where: {
        subblock_pronounce_id,
      },
    });
    const createdPronounceItem = await db.pronounceItem.create({
      data: {
        subblock_pronounce_id,
        order: pronounceItemsOfSubblock + 1,
        name: "Название",
        value: "A word or a phrase",
      },
    });
    revalidateTag("pronounceItems");
    return { data: createdPronounceItem };
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось создать вопрос",
    };
  }
};

export const createPronounceItem = createSafeAction(
  CreatePronounceItem,
  handler
);
