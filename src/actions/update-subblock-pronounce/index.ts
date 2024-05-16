"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateSubblockPronounce } from "./schema";
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
  const { subblock_pronounce_id, name, description, value } = data;
  try {
    const updatedSubblockTest = await db.subblockPronounce.update({
      where: {
        subblock_pronounce_id: subblock_pronounce_id,
      },
      data: {
        name: name,
        description: description,
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

export const updateSubblockPronounce = createSafeAction(
  UpdateSubblockPronounce,
  handler
);
