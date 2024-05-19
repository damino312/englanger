"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateSubblockTest } from "./schema";
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
  const { subblock_test_id, name } = data;
  try {
    const updatedSubblockTest = await db.subblockTest.update({
      where: {
        subblock_test_id: subblock_test_id,
      },
      data: {
        name: name,
      },
    });

    return { data: updatedSubblockTest };
  } catch (error) {
    console.error(error);
    return {
      error: "Не переименовать подблок",
    };
  }
};

export const updateSubblockTest = createSafeAction(UpdateSubblockTest, handler);
