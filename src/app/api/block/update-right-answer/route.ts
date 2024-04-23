import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(res: NextRequest, req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const data = await res.json();
    const { questionId, answerId } = data;

    const createdQuestion = await db.$transaction(async (tx) => {
      const prevTrueAnswer = await tx.answerTest.findFirst({
        where: {
          question_test_id: questionId,
          is_answer: true,
        },
      });

      if (prevTrueAnswer) {
        await tx.answerTest.update({
          where: {
            answer_test_id: prevTrueAnswer.answer_test_id,
          },
          data: {
            is_answer: false,
          },
        });
      }
      const updatedAnswer = await tx.answerTest.update({
        where: {
          answer_test_id: answerId,
        },
        data: {
          is_answer: true,
        },
      });
      return updatedAnswer;
    });

    return Response.json(createdQuestion);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
