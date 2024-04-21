"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateAnswerTest } from "./schema";
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
  const {
    answer_test_id,
    order,
    name,
    is_answer,
    is_changing_right_answer,
    question_test_id,
  } = data;
  try {
    let updateAnswer;
    if (is_changing_right_answer) {
      const updatedFalseAnswers = await db.answerTest.updateMany({
        where: {
          question_test_id: question_test_id,
        },
        data: {
          is_answer: false,
        },
      });
      updateAnswer = await db.answerTest.update({
        where: {
          answer_test_id: answer_test_id,
        },
        data: {
          is_answer: true,
        },
      });
      return { data: updateAnswer };
    } else {
      updateAnswer = await db.answerTest.update({
        where: {
          answer_test_id: answer_test_id,
        },
        data: {
          order: order,
          name: name,
          is_answer: is_answer,
        },
      });
      return { data: updateAnswer };
    }
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось изменить ответ",
    };
  }
};

export const updateAnswerTest = createSafeAction(UpdateAnswerTest, handler);
