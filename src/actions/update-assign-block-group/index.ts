"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateAssignBlockGroup } from "./schema";
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
  const { assign_block_group_id, deadline, max_try_count, time_limit } = data;
  try {
    const savedAssignBlockGroup = await db.assignBlockGroup.update({
      where: {
        assign_block_group_id,
      },
      data: {
        deadline,
        max_try_count,
        time_limit,
      },
    });
    revalidateTag("assign-block-groups");
    return { data: savedAssignBlockGroup };
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось изменить назначение блока",
    };
  }
};

export const updateAssignBlockGroup = createSafeAction(
  UpdateAssignBlockGroup,
  handler
);
