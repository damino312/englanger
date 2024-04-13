"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateAnswerTest } from "./schema";
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
  const { question_test_id, order } = data;
  try {
    const existedAnswer = await db.answerTest.findMany({
      where: {
        question_test_id: question_test_id,
      },
    });
    const isAnswer = existedAnswer.length === 0 ? true : false;

    const createdQuestion = await db.answerTest.create({
      data: {
        question_test_id: question_test_id,
        order: order,
        name: "Ответ",
        is_answer: isAnswer,
      },
    });

    // revalidatePath("/main/create-block/" + { block_id });
    return { data: createdQuestion };
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось создать вопрос",
    };
  }
};

export const createAnswerTest = createSafeAction(CreateAnswerTest, handler);
