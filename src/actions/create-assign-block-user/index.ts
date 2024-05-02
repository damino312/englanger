"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateAssignBlockUser } from "./schema";
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
  const { user_id, assign_block_group_id } = data;
  try {
    const createdAssignBlockUser = await db.assignBlockUsers.create({
      data: {
        user_id: user_id,
        assign_block_group_id: assign_block_group_id,
      },
    })
    revalidateTag("assign-block-users");
    return { data: createdAssignBlockUser };
  } catch (error) {
    console.error(error);
    return {
      error: "Не назначить блок для группы",
    };
  }
};

export const createAssignBlockUser = createSafeAction(
  CreateAssignBlockUser,
  handler
);
