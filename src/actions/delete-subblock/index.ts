"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteSubblock } from "./schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { error } from "console";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);
  if (!session?.user.user_id) {
    return {
      error: "Необходима авторизация",
    };
  }
  const { subblock_id, type } = data;
  let obj: any;
  if (type === 1) obj = { subblock_test_id: subblock_id };
  if (type === 2) obj = { subblock_description_id: subblock_id };
  // if (type === 3) obj = {subblock_test_id: subblock_id}
  try {
    if (obj) {
      console.log(obj);
      const foundOrder = await db.subblockOrder.findFirst({
        where: {
          subblock_test_id: subblock_id,
        },
      });
      let deletedOrder;
      if (foundOrder) {
        deletedOrder = await db.subblockOrder.delete({
          where: foundOrder,
        });
      } else {
        throw new Error("foundOrder пустой");
      }
      return { data: deletedOrder };
    } else {
      throw new Error("obj пустой");
    }
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось удалить подблок",
    };
  }
};

export const deleteSubblock = createSafeAction(DeleteSubblock, handler);
