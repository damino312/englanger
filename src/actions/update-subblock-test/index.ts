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
  const { subblock_order_id, name, order } = data;
  try {
    const updatedSubblockTest = await db.subblockOrder.update({
      where: {
        subblock_order_id: subblock_order_id,
      },
      data: {
        name: name,
        order: order,
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
