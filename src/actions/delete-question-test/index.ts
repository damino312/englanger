"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteQuestionTest } from "./schema";
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
  const { question_test_id } = data;
  try {
    const deletedQuestionTest = await db.questionTest.delete({
      where: {
        question_test_id: question_test_id,
      },
    });

    // revalidatePath("/main/create-block/" + { block_id });
    return { data: deletedQuestionTest };
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось удалить вопрос",
    };
  }
};

export const deleteQuestionTest = createSafeAction(DeleteQuestionTest, handler);
