"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateLearningOutcome } from "./schema";
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
  const { answer_array, student_id, block_id } = data;

  const answeredQuestions: number[] = answer_array.map(
    (answer) => answer.question_id
  );
  const signedAnswers: number[] = answer_array.map(
    (answer) => answer.answer_id
  );
  try {
    const questions = await db.questionTest.findMany({
      where: {
        question_test_id: {
          in: answeredQuestions,
        },
      },
      include: {
        answer_tests: {
          where: {
            is_answer: true,
          },
        },
      },
    });

    const rightAnswersCount = questions.reduce((acc: number, question) => {
      const answersArray = question.answer_tests;
      if (answersArray.length > 0) {
        // reduce сделан для будущего расширения - если у вопроса может быть несколько правильных ответов
        const matches = answersArray.reduce((innerAcc: number, answer) => {
          if (signedAnswers.includes(answer.answer_test_id)) {
            return innerAcc + 1;
          } else {
            return innerAcc;
          }
        }, 0);
        return matches + acc;
      } else {
        return acc;
      }
    }, 0);

    const block = await db.block.findFirst({
      where: {
        block_id,
      },
      include: {
        subblock_orders: {
          where: {
            subblock_test_id: { not: null },
          },
          select: {
            subblock_test_id: true,
          },
        },
      },
    });

    if (block) {
      const allTestsInBlock = block.subblock_orders
        .map((order) => order.subblock_test_id)
        .filter((id) => id !== null);

      const totalQuestionCount = await db.questionTest.findMany({
        where: {
          subblock_test_id: {
            in: allTestsInBlock,
          },
        },
      });

      const gradePercentage =
        (rightAnswersCount / totalQuestionCount.length) * 100;
      console.log({
        gradePercentage: gradePercentage,
        totalQuestionCount: totalQuestionCount.length,
        rightAnswersCount: rightAnswersCount,
      });
    } else {
      new Error("Блок не найден");
    }

    return { error: "return" };
  } catch (error) {
    console.error(error);
    return {
      error: "Не удалось обработать ответы",
    };
  }
};

export const createLearningOutcome = createSafeAction(
  CreateLearningOutcome,
  handler
);
