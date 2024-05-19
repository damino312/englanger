"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdatePronounceItem } from "./schema";
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
  const { pronounce_item_id, name, value } = data;
  try {
    const updatedSubblockTest = await db.pronounceItem.update({
      where: {
        pronounce_item_id: pronounce_item_id,
      },
      data: {
        name: name,
        value: value,
      },
    });
    revalidateTag("pronounce");
    return { data: updatedSubblockTest };
  } catch (error) {
    console.error(error);
    return {
      error: "Не переименовать подблок",
    };
  }
};

export const updatePronounceItem = createSafeAction(
  UpdatePronounceItem,
  handler
);
