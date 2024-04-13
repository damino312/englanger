"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateQuestionTest } from "./schema";
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
  const { order, subblock_test_id } = data;
  try {
    const createdQuestion = await db.$transaction(async (tx) => {
      const questionTest = await db.questionTest.create({
        data: {
          subblock_test_id: subblock_test_id,
          order: order,
          question: "Вопрос",
        },
      });
      const answersData = [
        {
          question_test_id: questionTest.question_test_id,
          name: "Ответ 1",
          is_answer: true,
          order: 1,
        },
        {
          question_test_id: questionTest.question_test_id,
          name: "Ответ 2",
          is_answer: false,
          order: 2,
        },
      ];
      const questions = await db.answerTest.createMany({
        data: answersData,
      });
      return questionTest;
    });

    return { data: createdQuestion };
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось создать вопрос",
    };
  }
};

export const createQuestionTest = createSafeAction(CreateQuestionTest, handler);
