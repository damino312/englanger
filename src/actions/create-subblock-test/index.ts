"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateSubblockTest } from "./schema";
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
  try {
    const createdSubblock = await db.$transaction(async (tx) => {
      const testSubblock = await db.subblockTest.create({
        data: {
          subblock_type_id: data.subblockTypeId,
          name: "Тест",
        },
      });
      const subblockOrder = await db.subblockOrder.create({
        data: {
          block_id: data.blockId,
          order: data.order,
          subblock_test_id: testSubblock.subblock_test_id,
        },
      });
      const questionTest = await db.questionTest.create({
        data: {
          subblock_test_id: testSubblock.subblock_test_id,
          order: 1,
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
      return testSubblock;
    });
    return { data: createdSubblock };
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось создать тестовый блок",
    };
  }
};

export const createSubblockTest = createSafeAction(CreateSubblockTest, handler);
