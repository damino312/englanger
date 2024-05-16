"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { StartBlock } from "./schema";
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
  const { user_id, assign_block_group_id, action } = data;
  try {
    // при первом начале теста будет создаваться запись
    if (action === "create") {
      const createdAssignBlockUser = await db.assignBlockUsers.create({
        data: {
          user_id: user_id,
          assign_block_group_id: assign_block_group_id,
          is_finished: false,
        },
      });
      revalidateTag("assign-block-users");
      return { data: createdAssignBlockUser };
      // иначе обновляться is_finished и current_try_count
    } else if (action === "update") {
      const existingAssignBlockUser = await db.assignBlockUsers.findFirst({
        where: {
          user_id: user_id,
          assign_block_group_id: assign_block_group_id,
        },
      });

      if (!existingAssignBlockUser) {
        console.error("existingAssignBlockUser пустое");
        throw new Error();
      }

      const updatedAssignBlockUser = await db.assignBlockUsers.update({
        where: existingAssignBlockUser,
        data: {
          is_finished: false,
          current_try_count: existingAssignBlockUser.current_try_count + 1,
        },
      });
      revalidateTag("assign-block-users");
      return { data: updatedAssignBlockUser };
    } else {
      throw new Error("Некорректное действие");
    }
  } catch (error) {
    console.error(error);
    return {
      error: "Не назначить блок для группы",
    };
  }
};

export const startBlock = createSafeAction(StartBlock, handler);
