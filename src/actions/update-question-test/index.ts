"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateQuestionTest } from './schema';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);
  if (!session?.user.user_id) {
    return {
      error: "Необходима авторизация",
    };
  }
  const {order, question_test_id,question,  block_id} = data
  try {
    const updatedQuestionTest = await db.questionTest.update({
      where: {
        question_test_id: question_test_id
      },
      data: {
        order: order,
        question: question
      }
    })
    
    
    revalidatePath("/main/create-block/" + { block_id });
    return { data: updatedQuestionTest };
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось изменить вопрос",
    };
  }
};

export const updateQuestionTest= createSafeAction(UpdateQuestionTest, handler);
