"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateSubblockTest } from "./schema";
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
    const createdSubblock = await db.$transaction(async (tx) => {
      const testSubblock = await db.subblockTest.create({
        data: {
          name: data.name,
          subblock_type_id: data.subblockTypeId,
        },
      });
      const subblockOrder = await db.subblockOrder.create({
        data: {
          block_id: data.blockId,
          order: data.order,
          subblock_test_id: testSubblock.subblock_test_id,
        },
      });
      return testSubblock;
    });
    return { data: createdSubblock };
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось создать тестовый блок",
    };
  }
};

export const createSubblockTest = createSafeAction(CreateSubblockTest, handler);
