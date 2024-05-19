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
    if (type === 1) {
      const deletedSubblock = await db.subblockTest.delete({
        where: {
          subblock_test_id: subblock_id,
        },
      });
      return { data: deletedSubblock };
    } else if (type === 2) {
      const deletedSubblock = await db.subblockPronounce.delete({
        where: {
          subblock_pronounce_id: subblock_id,
        },
      });
      return { data: deletedSubblock };
    } else {
      throw new Error("Неверный тип подблока");
    }
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось удалить подблок",
    };
  }
};

export const deleteSubblock = createSafeAction(DeleteSubblock, handler);
