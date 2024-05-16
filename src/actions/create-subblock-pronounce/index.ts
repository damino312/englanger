"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CreateSubblockPronounce } from "./schema";
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
    const createdSubblock = await db.$transaction(async (tx) => {
      const subblockPronounce = await db.subblockPronounce.create({
        data: {
          subblock_type_id: data.subblockTypeId,
          name: "Произношение",
          description: 'Описание',
          value: 'Слово',
        },
      });
      const subblockOrder = await db.subblockOrder.create({
        data: {
          name: data.name,
          block_id: data.blockId,
          order: data.order,
          subblock_pronounce_id: subblockPronounce.subblock_pronounce_id,
        },
      });

      return subblockPronounce;
    });
    return { data: createdSubblock };
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось создать блок произношения",
    };
  }
};

export const createSubblockPronounce = createSafeAction(CreateSubblockPronounce, handler);
