"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteSubblock } from "./schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);
  if (!session?.user.user_id) {
    return {
      error: "Необходима авторизация",
    };
  }
  const { subblock_id, type } = data;

  try {
    let foundOrder;

    if (type === 1) {
      foundOrder = await db.subblockOrder.findFirst({
        where: {
          subblock_test_id: subblock_id,
        },
      });
    } else if (type === 2) {
      foundOrder = await db.subblockOrder.findFirst({
        where: {
          subblock_pronounce_id: subblock_id,
        },
      });
    } else {
      throw new Error("Неверный тип подблока");
    }

    if (foundOrder) {
      const deletedOrder = await db.subblockOrder.delete({
        where: foundOrder,
      });
      return { data: deletedOrder };
    } else {
      throw new Error("Подблок не найден");
    }
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось удалить подблок",
    };
  }
};

export const deleteSubblock = createSafeAction(DeleteSubblock, handler);
